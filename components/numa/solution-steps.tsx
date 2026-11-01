'use client'

import { BookOpenCheck, Check, ChevronDown, RotateCcw } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import type { Problem } from '@/lib/numa-data'
import { cn } from '@/lib/utils'
import { MathText } from './math-text'

export function SolutionSteps({ problem }: { problem: Problem }) {
  const steps = (problem as any).steps || []
  const total = steps.length
  const [revealed, setRevealed] = useState(1)

  // 防護：如果這題沒有 steps 詳解（例如早期歷屆試題），提供漂亮的 Fallback 顯示
  if (total === 0) {
    return (
      <div className="flex flex-col gap-4 py-4">
        <div className="rounded-lg border bg-card p-4 flex flex-col gap-2">
          <span className="text-xs font-semibold text-muted-foreground">正確答案</span>
          <MathText className="text-lg font-bold">{(problem as any).answer || '詳解整理中'}</MathText>
        </div>
        <div className="rounded-xl border border-dashed p-6 text-center text-sm text-muted-foreground flex flex-col items-center gap-2">
          <p>此歷屆試題目前尚未編寫分步詳解。</p>
          <p className="text-xs">您可以點擊題目卡片上的「AI 提示」，讓 AI 一步步帶您思考解題關鍵！</p>
        </div>
      </div>
    )
  }

  const done = revealed > total

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <div
          className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={total}
          aria-valuenow={Math.min(revealed, total)}
          aria-label="詳解進度"
        >
          <div
            className="h-full rounded-full bg-brand transition-all duration-500"
            style={{ width: `${(Math.min(revealed, total) / total) * 100}%` }}
          />
        </div>
        <span className="font-mono text-xs text-muted-foreground">{`${Math.min(revealed, total)}/${total}`}</span>
      </div>

      <ol className="flex flex-col gap-3">
        {steps.slice(0, revealed).map((step: any, index: number) => (
          <li
            key={step.title || index}
            className="flex gap-3 animate-in fade-in-0 slide-in-from-bottom-2 duration-300"
          >
            <span
              className={cn(
                'flex size-7 shrink-0 items-center justify-center rounded-full font-mono text-xs font-semibold',
                'bg-primary text-primary-foreground',
              )}
              aria-hidden="true"
            >
              {index + 1}
            </span>
            <div className="flex min-w-0 flex-1 flex-col gap-1 rounded-lg border p-3">
              <p className="text-sm font-semibold">{`步驟 ${index + 1}：${step.title}`}</p>
              <MathText className="text-sm text-muted-foreground">{step.body}</MathText>
            </div>
          </li>
        ))}
      </ol>

      {done && (
        <div className="flex items-start gap-3 rounded-lg border border-brand/50 bg-brand/10 p-4 animate-in fade-in-0">
          <Check className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden="true" />
          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold">答案</span>
            <MathText className="font-semibold">{problem.answer}</MathText>
          </div>
        </div>
      )}

      <div className="flex justify-end gap-2">
        {revealed > 1 && (
          <Button variant="ghost" size="sm" onClick={() => setRevealed(1)} className="gap-1.5">
            <RotateCcw className="size-3.5" aria-hidden="true" />
            重新開始
          </Button>
        )}
        {!done && (
          <>
            <Button variant="outline" size="sm" onClick={() => setRevealed(total + 1)}>
              顯示全部
            </Button>
            <Button size="sm" onClick={() => setRevealed((n) => n + 1)} className="gap-1.5">
              {revealed === total ? '看答案' : '下一步'}
              <ChevronDown className="size-3.5" aria-hidden="true" />
            </Button>
          </>
        )}
      </div>
    </div>
  )
}