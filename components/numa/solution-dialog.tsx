'use client'

import { BookOpenCheck } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import type { Problem } from '@/lib/numa-data'
import { MathText } from './math-text'
import { SolutionSteps } from './solution-steps'

export function SolutionDialog({ problem }: { problem: Problem }) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button size="sm" className="gap-1.5" />}>
        <BookOpenCheck className="size-3.5" aria-hidden="true" />
        詳解
      </DialogTrigger>
      <DialogContent className="max-h-[85dvh] overflow-y-auto sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>{`${problem.topic}・分步詳解`}</DialogTitle>
          <DialogDescription>一步一步展開，先想想看下一步再點開。</DialogDescription>
        </DialogHeader>
        <div className="rounded-lg bg-muted p-4">
          <MathText className="text-[15px]">{problem.statement}</MathText>
        </div>
        {open && <SolutionSteps problem={problem} />}
      </DialogContent>
    </Dialog>
  )
}
