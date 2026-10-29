import { ArrowRight, Sparkles } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { EXAMS, PROBLEMS } from '@/lib/numa-data'
import { MathText } from './math-text'

interface HeroProps {
  onStart: () => void
  onOpenTutor: () => void
}

export function Hero({ onStart, onOpenTutor }: HeroProps) {
  return (
    <section aria-labelledby="hero-title" className="grid items-center gap-8 lg:grid-cols-[1.25fr_1fr]">
      <div className="flex flex-col gap-6">
        <p className="inline-flex w-fit items-center gap-2 rounded-full border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
          <span className="size-1.5 rounded-full bg-brand" aria-hidden="true" />
          {'會考 · 學測 · 分科 一站式數學備考'}
        </p>
        <h1 id="hero-title" className="text-4xl font-black leading-tight tracking-tight text-balance sm:text-5xl">
          {'從數之本出發，'}
          <span className="relative whitespace-nowrap">
            <span className="relative z-10">{'穩穩拿分'}</span>
            <span className="absolute inset-x-0 bottom-1 z-0 h-3 rounded-sm bg-brand/40" aria-hidden="true" />
          </span>
        </h1>
        <p className="max-w-xl text-base leading-relaxed text-muted-foreground text-pretty">
          精選三大考試題庫與分步詳解、最新升學時程與級分解讀，再搭配會用提問引導你思考的 AI 教練，把每一題都真正弄懂。
        </p>
        <div className="flex flex-wrap gap-3">
          <Button size="lg" onClick={onStart} className="gap-2">
            開始刷題
            <ArrowRight className="size-4" aria-hidden="true" />
          </Button>
          <Button size="lg" variant="outline" onClick={onOpenTutor} className="gap-2">
            <Sparkles className="size-4 text-brand" aria-hidden="true" />
            試試 AI 解題
          </Button>
        </div>
        <dl className="grid max-w-md grid-cols-3 gap-4 border-t pt-6">
          <div>
            <dt className="text-xs text-muted-foreground">考試專區</dt>
            <dd className="mt-1 font-mono text-2xl font-semibold">3</dd>
          </div>
          <div>
            <dt className="text-xs text-muted-foreground">精選例題</dt>
            <dd className="mt-1 font-mono text-2xl font-semibold">{PROBLEMS.length}</dd>
          </div>
          <div>
            <dt className="text-xs text-muted-foreground">AI 教練</dt>
            <dd className="mt-1 font-mono text-2xl font-semibold">24/7</dd>
          </div>
        </dl>
      </div>

      <div className="relative overflow-hidden rounded-2xl bg-sidebar p-6 text-sidebar-foreground shadow-xl shadow-primary/10">
        <div className="flex items-start gap-4">
          <Image
            src="/numa-mascot.png"
            alt="NUMA 吉祥物：戴著圓眼鏡、胸前有圓周率符號的貓頭鷹"
            width={112}
            height={112}
            className="size-24 shrink-0 rounded-2xl sm:size-28"
            priority
          />
          <div className="flex flex-col gap-2 pt-1">
            <p className="text-xs font-medium tracking-widest text-sidebar-primary">NUMA 今日一題</p>
            <MathText className="text-sm text-sidebar-foreground/90">
              {String.raw`若 $\sin\theta + \cos\theta = \tfrac{1}{2}$，你會先做什麼？`}
            </MathText>
          </div>
        </div>
        <ul className="mt-6 flex flex-col divide-y divide-sidebar-border rounded-xl border border-sidebar-border bg-sidebar-accent/40">
          {EXAMS.map((exam) => (
            <li key={exam.id} className="flex items-center justify-between gap-3 px-4 py-3 text-sm">
              <span className="font-semibold">{exam.name}</span>
              <span className="text-right text-xs text-sidebar-foreground/65">{exam.nextDate}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
