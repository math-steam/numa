'use client'

import { Check, ChevronDown, RotateCcw } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import type { Problem } from '@/lib/numa-data'
import { cn } from '@/lib/utils'
import { MathText } from './math-text'

export function SolutionSteps({ problem }: { problem: Problem }) {
  const [revealed, setRevealed] = useState(1)
  const total = problem.steps.length
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
        {problem.steps.slice(0, revealed).map((step, index) => (
          <li
            key={step.title}
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
