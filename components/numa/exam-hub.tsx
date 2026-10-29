'use client'

import { BookOpenCheck, GraduationCap } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { EXAMS, type ExamId } from '@/lib/numa-data'
import { cn } from '@/lib/utils'
import { AdmissionInfo } from './admission-info'
import { ProblemBank } from './problem-bank'
import type { HubView } from './sidebar-nav'

interface ExamHubProps {
  exam: ExamId
  view: HubView
  onExamChange: (exam: ExamId) => void
  onViewChange: (view: HubView) => void
}

export function ExamHub({ exam, view, onExamChange, onViewChange }: ExamHubProps) {
  const current = EXAMS.find((item) => item.id === exam) ?? EXAMS[0]

  return (
    <section id="exam-hub" aria-labelledby="exam-hub-title" className="flex scroll-mt-20 flex-col gap-6">
      <div className="flex flex-col gap-2">
        <p className="font-mono text-xs tracking-[0.25em] text-brand">EXAM HUB</p>
        <h2 id="exam-hub-title" className="text-3xl font-black tracking-tight">
          考試專區
        </h2>
        <p className="text-muted-foreground">選擇你的考試，切換題庫練習或升學資訊。</p>
      </div>

      <div role="radiogroup" aria-label="選擇考試" className="grid gap-3 sm:grid-cols-3">
        {EXAMS.map((item) => {
          const active = item.id === exam
          return (
            <button
              key={item.id}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => onExamChange(item.id)}
              className={cn(
                'group flex flex-col gap-2 rounded-xl border p-4 text-left transition-all',
                active
                  ? 'border-primary bg-primary text-primary-foreground shadow-lg shadow-primary/15'
                  : 'bg-card hover:border-foreground/25',
              )}
            >
              <span className="flex items-center justify-between">
                <span className="text-lg font-bold">{item.name}</span>
                <span
                  className={cn(
                    'font-mono text-[10px] tracking-wider',
                    active ? 'text-primary-foreground/70' : 'text-muted-foreground',
                  )}
                >
                  {item.english}
                </span>
              </span>
              <span className={cn('text-xs', active ? 'text-primary-foreground/80' : 'text-muted-foreground')}>
                {item.subject}
              </span>
            </button>
          )
        })}
      </div>

      <Tabs value={view} onValueChange={(value) => onViewChange(value as HubView)} className="gap-6">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <p className="text-sm text-muted-foreground text-pretty">{current.description}</p>
          <TabsList className="h-10! shrink-0">
            <TabsTrigger value="bank" className="gap-1.5 px-4">
              <BookOpenCheck className="size-4" aria-hidden="true" />
              題庫與詳解
            </TabsTrigger>
            <TabsTrigger value="admission" className="gap-1.5 px-4">
              <GraduationCap className="size-4" aria-hidden="true" />
              升學資訊
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="bank">
          <ProblemBank key={exam} exam={exam} />
        </TabsContent>
        <TabsContent value="admission">
          <AdmissionInfo exam={exam} />
        </TabsContent>
      </Tabs>
    </section>
  )
}
