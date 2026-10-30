'use client'

import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'
import { Lightbulb, Loader2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { DIFFICULTY_LABEL, type Problem } from '@/lib/numa-data'
import { cn } from '@/lib/utils'
import { MathText } from './math-text'
import { SolutionDialog } from './solution-dialog'
import { getMessageText } from './message-text'

const transport = new DefaultChatTransport({ api: '/api/tutor' })

function DifficultyMeter({ level }: { level: Problem['difficulty'] }) {
  return (
    <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
      <span className="flex gap-0.5" aria-hidden="true">
        {[1, 2, 3].map((n) => (
          <span key={n} className={cn('h-2.5 w-1.5 rounded-sm', n <= level ? 'bg-brand' : 'bg-border')} />
        ))}
      </span>
      <span className="sr-only">難度：</span>
      {DIFFICULTY_LABEL[level]}
    </span>
  )
}

export function ProblemCard({ problem, index }: { problem: Problem; index: number }) {
  const { messages, sendMessage, status, error } = useChat({ id: `hint-${problem.id}`, transport })

  const hints = messages.filter((m) => m.role === 'assistant')
  const busy = status === 'submitted' || status === 'streaming'

  const requestHint = () => {
    sendMessage(
      { text: hints.length === 0 ? '請給我第一個提示。' : '我還是卡住了，請給我下一個提示。' },
      { 
        body: { 
          mode: 'hint', 
          problem: problem.statement || `題目單元：${problem.topic}`,
          // 👈 帶入 JSON 資料庫的完整資訊
          imagePath: (problem as any).image_path,
          answer: (problem as any).answer,
          topic: problem.topic,
          year: (problem as any).year
        } 
      },
    )
  }

  return (
    <article className="flex h-full flex-col gap-4 rounded-xl border bg-card p-5 text-card-foreground">
      <header className="flex items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-xs text-muted-foreground">{`Q${String(index).padStart(2, '0')}`}</span>
          <Badge variant="secondary">{problem.topic}</Badge>

          {/* 1. 若有年份與題號，優先顯示 */}
          {('year' in problem && (problem as any).year) && (
            <span className="text-xs font-medium text-muted-foreground">
              {(problem as any).year} 年 第 {(problem as any).q_no} 題
            </span>
          )}

          {/* 2. 只有當 accuracy 存在且不為 NULL / 空字串時，才顯示答對率 */}
          {('accuracy' in problem && (problem as any).accuracy) && (
            <span className="rounded bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-700 border border-amber-200">
              答對率 {(problem as any).accuracy}%
            </span>
          )}
        </div>

        {/* 難易度指示器：若無 difficulty 資料（如匯入的試題），可改為預設標籤 */}
        {problem.difficulty ? (
          <DifficultyMeter level={problem.difficulty} />
        ) : (
          <span className="text-xs font-medium text-amber-600 bg-amber-50/50 px-2 py-0.5 rounded border border-amber-100">
            歷屆真題
          </span>
        )}
      </header>

      <MathText className="text-[15px]">{problem.statement}</MathText>
      {/* 👈 優先判斷是否有圖片路徑 (cap/gsat 題目截圖) */}
      {('image_path' in problem && problem.image_path) ? (
        <div className="relative my-1 overflow-hidden rounded-lg border bg-white p-2">
          <img
            src={`/${(problem as any).image_path}`}
            alt={`${problem.topic} 第 ${index} 題`}
            className="mx-auto max-h-56 w-full object-contain"
          />
        </div>
      ) : problem.statement ? (
        <MathText className="text-[15px]">{problem.statement}</MathText>
      ) : null}

      {hints.length > 0 && (
        <ol className="flex flex-col gap-2" aria-label="AI 提示">
          {hints.map((hint, i) => (
            <li key={hint.id} className="flex gap-2.5 rounded-lg bg-accent/60 p-3 text-sm text-accent-foreground">
              <Lightbulb className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden="true" />
              <div className="flex flex-col gap-0.5">
                <span className="text-xs font-semibold">{`提示 ${i + 1}`}</span>
                <MathText>{getMessageText(hint) || '思考中…'}</MathText>
              </div>
            </li>
          ))}
        </ol>
      )}

      {error && <p className="text-xs text-destructive">提示暫時無法取得，請稍後再試。</p>}

      <footer className="mt-auto flex items-center justify-between gap-2 border-t pt-4">
        <span className="text-xs text-muted-foreground">{problem.source}</span>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={requestHint} disabled={busy} className="gap-1.5">
            {busy ? (
              <Loader2 className="size-3.5 animate-spin" aria-hidden="true" />
            ) : (
              <Lightbulb className="size-3.5 text-brand" aria-hidden="true" />
            )}
            {hints.length === 0 ? 'AI 提示' : '下一個提示'}
          </Button>
          <SolutionDialog problem={problem} />
        </div>
      </footer>
    </article>
  )
}
