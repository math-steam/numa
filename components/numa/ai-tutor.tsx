'use client'

import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'
import { ArrowUp, ListOrdered, MessagesSquare, Sparkles, Square } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { EXAMS, PROBLEMS } from '@/lib/numa-data'
import { cn } from '@/lib/utils'
import { MathText } from './math-text'
import { getMessageText } from './message-text'
import { SolutionSteps } from './solution-steps'

const CUSTOM = 'custom'
const PRACTICE_IDS = ['cap-2', 'cap-4', 'gsat-2', 'gsat-5', 'ast-1', 'ast-3']
const PRACTICE = PRACTICE_IDS.map((id) => PROBLEMS.find((p) => p.id === id)!).filter(Boolean)
const transport = new DefaultChatTransport({ api: '/api/tutor' })

type TutorMode = 'socratic' | 'solve'

// 擴充 Prop 介面，讓 problem-card.tsx 點擊時能直接傳進特定題目
interface AiTutorProps {
  initialProblemId?: string; // 外部帶入的題目 ID
  customQuestions?: any[];   // 從 cap_questions.json 傳進來的列表
}

export function AiTutor({ initialProblemId, customQuestions }: AiTutorProps) {
  // 如果有傳入 customQuestions，就優先使用；否則使用原本預設的 PRACTICE
  const problemList = customQuestions && customQuestions.length > 0 
    ? customQuestions 
    : PRACTICE;

  const [selectedId, setSelectedId] = useState<string>(
    initialProblemId || problemList[0]?.id || PRACTICE[0].id
  );
  
function toProblemText(input: string) {
  const trimmed = input.trim()
  if (!trimmed) return ''
  return trimmed.includes('$') || /[\u4e00-\u9fff]/.test(trimmed) ? trimmed : `$$${trimmed}$$`
}

export function AiTutor() {
  const [selectedId, setSelectedId] = useState<string>(PRACTICE[0].id)
  const [customInput, setCustomInput] = useState(String.raw`\int_0^{\pi} \sin x \, dx`)
  const [reply, setReply] = useState('')
  const [mode, setMode] = useState<TutorMode>('socratic')
  const [panel, setPanel] = useState<'chat' | 'steps'>('chat')

  const { messages, sendMessage, setMessages, status, stop, error } = useChat({ id: 'numa-tutor', transport })

  const selected = PRACTICE.find((p) => p.id === selectedId)
  const problemText = selected ? selected.statement : toProblemText(customInput)
  const busy = status === 'submitted' || status === 'streaming'

  const resetConversation = () => {
    stop()
    setMessages([])
  }

  const selectProblem = (id: string) => {
    if (id === selectedId) return
    resetConversation()
    setSelectedId(id)
    setPanel('chat')
  }

  const start = (nextMode: TutorMode) => {
    if (!problemText) return
    resetConversation()
    setMode(nextMode)
    setPanel('chat')
    sendMessage(
      { text: nextMode === 'solve' ? '請給我這題完整的分步詳解。' : '我想挑戰這題，請一步一步引導我開始思考。' },
      { body: { mode: nextMode, problem: problemText } },
    )
  }

  const submitReply = () => {
    const text = reply.trim()
    if (!text || busy || !problemText) return
    sendMessage({ text }, { body: { mode, problem: problemText } })
    setReply('')
  }

  return (
    <section id="ai-tutor" aria-labelledby="ai-tutor-title" className="flex scroll-mt-20 flex-col gap-6">
      <div className="flex flex-col gap-2">
        <p className="font-mono text-xs tracking-[0.25em] text-brand">AI TUTOR</p>
        <h2 id="ai-tutor-title" className="text-3xl font-black tracking-tight">
          AI 動態解題教練
        </h2>
        <p className="text-muted-foreground text-pretty">
          選一題或輸入 LaTeX 題目，NUMA 會用蘇格拉底式提問陪你想，也能一步步展開完整詳解。
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
        <div className="flex flex-col gap-4 rounded-xl border bg-card p-5">
          <fieldset className="flex flex-col gap-3">
            <legend className="mb-3 text-sm font-semibold">選擇題目</legend>
            <div className="grid grid-cols-2 gap-2">
              {PRACTICE.map((problem) => {
                const exam = EXAMS.find((e) => e.id === problem.exam)
                const active = problem.id === selectedId
                return (
                  <button
                    key={problem.id}
                    type="button"
                    onClick={() => selectProblem(problem.id)}
                    aria-pressed={active}
                    className={cn(
                      'flex flex-col items-start gap-0.5 rounded-lg border px-3 py-2 text-left transition-colors',
                      active ? 'border-primary bg-primary text-primary-foreground' : 'hover:bg-muted',
                    )}
                  >
                    <span className={cn('text-[10px] font-medium', active ? 'text-primary-foreground/70' : 'text-muted-foreground')}>
                      {exam?.short}
                    </span>
                    <span className="text-sm font-semibold">{problem.topic}</span>
                  </button>
                )
              })}
              <button
                type="button"
                onClick={() => selectProblem(CUSTOM)}
                aria-pressed={selectedId === CUSTOM}
                className={cn(
                  'col-span-2 rounded-lg border border-dashed px-3 py-2 text-sm font-semibold transition-colors',
                  selectedId === CUSTOM ? 'border-primary bg-primary text-primary-foreground' : 'hover:bg-muted',
                )}
              >
                自行輸入題目（支援 LaTeX）
              </button>
            </div>
          </fieldset>

          {selectedId === CUSTOM && (
            <div className="flex flex-col gap-2">
              <label htmlFor="custom-problem" className="text-xs font-semibold text-muted-foreground">
                LaTeX 輸入
              </label>
              <Textarea
                id="custom-problem"
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                rows={3}
                spellCheck={false}
                className="font-mono text-sm"
                placeholder={String.raw`例如：\lim_{x \to 0} \frac{\sin 2x}{x}`}
              />
            </div>
          )}

          <div className="flex flex-col gap-2">
            <p className="text-xs font-semibold text-muted-foreground">題目預覽</p>
            <div className="min-h-20 rounded-lg bg-muted p-4 flex items-center justify-center">
              {selected && 'image_path' in selected && selected.image_path ? (
                <div className="relative w-full overflow-hidden rounded-md border bg-white p-2">
                  <img
                    src={`/${(selected as any).image_path}`}
                    alt={`${selected.topic || '題目'} 截圖`}
                    className="mx-auto max-h-48 object-contain"
                  />
                </div>
              ) : problemText ? (
                <MathText className="text-[15px]">{problemText}</MathText>
              ) : (
                <p className="text-sm text-muted-foreground">輸入題目後會在這裡即時預覽。</p>
              )}
            </div>
          </div>

          <div className="mt-auto grid grid-cols-2 gap-2">
            <Button onClick={() => start('socratic')} disabled={!problemText} className="gap-1.5">
              <MessagesSquare className="size-4" aria-hidden="true" />
              蘇格拉底引導
            </Button>
            <Button variant="outline" onClick={() => start('solve')} disabled={!problemText} className="gap-1.5">
              <Sparkles className="size-4 text-brand" aria-hidden="true" />
              AI 完整詳解
            </Button>
          </div>
        </div>

        <Tabs
          value={panel}
          onValueChange={(value) => setPanel(value as 'chat' | 'steps')}
          className="flex min-h-[32rem] flex-col gap-0 overflow-hidden rounded-xl border bg-card"
        >
          <div className="flex items-center justify-between gap-3 border-b px-4 py-3">
            <div className="flex items-center gap-2.5">
              <Image src="/numa-mascot.png" alt="" width={32} height={32} className="size-8 rounded-lg" />
              <div className="flex flex-col leading-tight">
                <span className="text-sm font-semibold">NUMA 教練</span>
                <span className="text-[11px] text-muted-foreground">
                  {busy ? '思考中…' : mode === 'solve' ? '完整詳解模式' : '引導提問模式'}
                </span>
              </div>
            </div>
            <TabsList>
              <TabsTrigger value="chat" className="gap-1 px-3 text-xs">
                <MessagesSquare className="size-3.5" aria-hidden="true" />
                對話
              </TabsTrigger>
              <TabsTrigger value="steps" disabled={!selected} className="gap-1 px-3 text-xs">
                <ListOrdered className="size-3.5" aria-hidden="true" />
                標準詳解
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="chat" className="flex min-h-0 flex-1 flex-col">
            <div className="flex max-h-[28rem] flex-1 flex-col gap-4 overflow-y-auto p-4" aria-live="polite">
              {messages.length === 0 ? (
                <div className="m-auto flex max-w-xs flex-col items-center gap-3 py-10 text-center">
                  <Image src="/numa-mascot.png" alt="" width={72} height={72} className="size-16 rounded-2xl" />
                  <p className="text-sm text-muted-foreground">
                    {'按下「蘇格拉底引導」，我會用提問陪你找到解法；想直接看過程就選「AI 完整詳解」。'}
                  </p>
                </div>
              ) : (
                messages.map((message) => {
                  const text = getMessageText(message)
                  const isUser = message.role === 'user'
                  return (
                    <div key={message.id} className={cn('flex', isUser ? 'justify-end' : 'justify-start')}>
                      <div
                        className={cn(
                          'max-w-[88%] rounded-2xl px-4 py-3 text-sm',
                          isUser ? 'rounded-br-sm bg-primary text-primary-foreground' : 'rounded-bl-sm bg-muted',
                        )}
                      >
                        <span className="sr-only">{isUser ? '你：' : 'NUMA：'}</span>
                        <MathText>{text || '…'}</MathText>
                      </div>
                    </div>
                  )
                })
              )}
              {status === 'submitted' && (
                <div className="flex gap-1 px-2" aria-label="NUMA 正在思考">
                  {[0, 1, 2].map((n) => (
                    <span
                      key={n}
                      className="size-1.5 animate-bounce rounded-full bg-brand"
                      style={{ animationDelay: `${n * 120}ms` }}
                    />
                  ))}
                </div>
              )}
              {error && (
                <p role="alert" className="rounded-lg bg-destructive/10 px-3 py-2 text-xs text-destructive">
                  {error.message || '連線發生問題，請再試一次。'}
                </p>
              )}
            </div>

            <form
              className="mt-auto flex items-end gap-2 border-t p-3"
              onSubmit={(e) => {
                e.preventDefault()
                submitReply()
              }}
            >
              <label htmlFor="tutor-reply" className="sr-only">
                回覆 NUMA
              </label>
              <Textarea
                id="tutor-reply"
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    if (e.nativeEvent.isComposing || e.keyCode === 229) return
                    e.preventDefault()
                    submitReply()
                  }
                }}
                rows={1}
                disabled={messages.length === 0}
                placeholder={messages.length === 0 ? '先選擇上方的開始方式' : '說說你的想法，例如：我想先兩邊平方…'}
                className="max-h-32 min-h-10 resize-none"
              />
              {busy ? (
                <Button type="button" size="icon" variant="outline" onClick={stop} aria-label="停止回覆">
                  <Square className="size-3.5" aria-hidden="true" />
                </Button>
              ) : (
                <Button type="submit" size="icon" disabled={!reply.trim() || messages.length === 0} aria-label="送出">
                  <ArrowUp className="size-4" aria-hidden="true" />
                </Button>
              )}
            </form>
          </TabsContent>

          <TabsContent value="steps" className="overflow-y-auto p-4">
            {selected && <SolutionSteps key={selected.id} problem={selected} />}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
