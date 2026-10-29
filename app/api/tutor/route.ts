import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  streamText,
  toUIMessageStream,
  type UIMessage,
} from 'ai'

export const maxDuration = 60

type TutorMode = 'hint' | 'socratic' | 'solve'

const BASE_PROMPT = `你是「數之本 NUMA」的 AI 數學教練，一隻戴眼鏡的貓頭鷹，服務台灣準備國中會考、高中學測與分科測驗的學生。
請一律使用繁體中文（台灣用語），語氣溫暖、精準、像一位耐心的家教。
所有數學式都必須用 LaTeX：行內用 $...$，獨立一行的式子用 $$...$$。不要使用 Markdown 標題（#）或表格。`

const MODE_PROMPTS: Record<TutorMode, string> = {
  hint: `目前是「AI 提示」模式：每次只給「一個」簡短提示（1～3 句），指出下一步該思考的方向或可用的公式。
絕對不要直接說出最終答案，也不要一次完成整個計算。若學生要求下一個提示，就在前一個提示的基礎上推進一小步。`,
  socratic: `目前是「蘇格拉底引導」模式：以提問引導學生自己發現解法。
每次回覆先用一句話肯定或回應學生，再提出「一個」具體的引導問題（例如：「題目給了什麼條件？」「哪個公式把這兩個量連起來？」）。
不要直接給出答案；若學生的回答有誤，溫和指出並再問一個更小的問題。回覆控制在 2～4 句。`,
  solve: `目前是「完整詳解」模式：請提供清楚的分步詳解。
每一步以「**步驟 n：簡短標題**」開頭並換行說明，步驟之間空一行。最後以「**答案：**」總結，並附上一句易錯提醒。`,
}

const MAX_MESSAGES = 30
const MAX_PROBLEM_LENGTH = 2000

export async function POST(req: Request) {
  const body = (await req.json()) as {
    messages?: UIMessage[]
    mode?: string
    problem?: string
  }

  const messages = Array.isArray(body.messages) ? body.messages.slice(-MAX_MESSAGES) : []
  const mode: TutorMode =
    body.mode === 'hint' || body.mode === 'solve' || body.mode === 'socratic' ? body.mode : 'socratic'
  const problem = typeof body.problem === 'string' ? body.problem.slice(0, MAX_PROBLEM_LENGTH).trim() : ''

  if (messages.length === 0) {
    return new Response('Missing messages', { status: 400 })
  }

  const system = [
    BASE_PROMPT,
    MODE_PROMPTS[mode],
    problem ? `學生正在練習的題目如下（LaTeX）：\n${problem}` : '學生尚未指定題目，請先請他描述題目。',
  ].join('\n\n')

  const result = streamText({
    model: 'google/gemini-3.5-flash',
    system,
    messages: await convertToModelMessages(messages),
  })

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({
      stream: result.stream,
      onError: (error) => {
        console.error('[tutor] generation failed:', error)
        const message = error instanceof Error ? error.message : ''
        if (/credit card/i.test(message)) {
          return 'AI 服務尚未啟用：請在 Vercel 團隊的 AI Gateway 設定中加入信用卡以解鎖免費額度。'
        }
        return 'NUMA 暫時無法回應，請稍後再試一次。'
      },
    }),
  })
}
