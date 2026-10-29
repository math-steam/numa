'use client'

import { BookOpenCheck, GraduationCap, Sparkles, type LucideIcon } from 'lucide-react'
import Image from 'next/image'
import { EXAMS, type ExamId } from '@/lib/numa-data'
import { cn } from '@/lib/utils'
import { ThemeToggle } from './theme-toggle'

export type HubView = 'bank' | 'admission'

interface SidebarNavProps {
  exam: ExamId
  view: HubView
  onSelectExam: (exam: ExamId) => void
  onSelectView: (view: HubView) => void
  onOpenTutor: () => void
}

const VIEW_ITEMS: { id: HubView; label: string; Icon: LucideIcon }[] = [
  { id: 'bank', label: '題庫與詳解', Icon: BookOpenCheck },
  { id: 'admission', label: '升學資訊', Icon: GraduationCap },
]

export function SidebarNav({ exam, view, onSelectExam, onSelectView, onOpenTutor }: SidebarNavProps) {
  return (
    <div className="flex h-full flex-col gap-8 bg-sidebar p-5 text-sidebar-foreground">
      <a href="#top" className="flex items-center gap-3 rounded-lg focus-visible:outline-2 focus-visible:outline-sidebar-ring">
        <Image
          src="/numa-mascot.png"
          alt=""
          width={44}
          height={44}
          className="size-11 rounded-xl ring-1 ring-sidebar-border"
          priority
        />
        <span className="flex flex-col leading-tight">
          <span className="text-lg font-black tracking-wide">數之本</span>
          <span className="font-mono text-xs tracking-[0.3em] text-sidebar-primary">NUMA</span>
        </span>
      </a>

      <nav aria-label="考試專區" className="flex flex-col gap-2">
        <p className="px-3 text-xs font-medium tracking-widest text-sidebar-foreground/50">考試專區</p>
        <ul className="flex flex-col gap-1">
          {EXAMS.map((item) => {
            const active = item.id === exam
            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => onSelectExam(item.id)}
                  aria-current={active ? 'true' : undefined}
                  className={cn(
                    'flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition-colors',
                    active
                      ? 'bg-sidebar-accent font-semibold text-sidebar-accent-foreground'
                      : 'text-sidebar-foreground/75 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground',
                  )}
                >
                  <span className="flex items-center gap-2.5">
                    <span
                      className={cn('size-1.5 rounded-full', active ? 'bg-sidebar-primary' : 'bg-sidebar-foreground/25')}
                      aria-hidden="true"
                    />
                    {item.name}
                  </span>
                  <span className="font-mono text-[10px] tracking-wider text-sidebar-foreground/45">{item.english}</span>
                </button>
              </li>
            )
          })}
        </ul>
      </nav>

      <nav aria-label="學習功能" className="flex flex-col gap-2">
        <p className="px-3 text-xs font-medium tracking-widest text-sidebar-foreground/50">學習功能</p>
        <ul className="flex flex-col gap-1">
          {VIEW_ITEMS.map(({ id, label, Icon }) => {
            const active = id === view
            return (
              <li key={id}>
                <button
                  type="button"
                  onClick={() => onSelectView(id)}
                  aria-current={active ? 'true' : undefined}
                  className={cn(
                    'flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm transition-colors',
                    active
                      ? 'bg-sidebar-accent font-semibold text-sidebar-accent-foreground'
                      : 'text-sidebar-foreground/75 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground',
                  )}
                >
                  <Icon className="size-4" aria-hidden="true" />
                  {label}
                </button>
              </li>
            )
          })}
          <li>
            <button
              type="button"
              onClick={onOpenTutor}
              className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm text-sidebar-foreground/75 transition-colors hover:bg-sidebar-accent/60 hover:text-sidebar-foreground"
            >
              <Sparkles className="size-4 text-sidebar-primary" aria-hidden="true" />
              AI 動態解題教練
            </button>
          </li>
        </ul>
      </nav>

      <div className="mt-auto flex flex-col gap-4">
        <div className="rounded-xl border border-sidebar-border bg-sidebar-accent/50 p-4">
          <p className="text-xs font-semibold text-sidebar-primary">NUMA 小叮嚀</p>
          <p className="mt-1.5 text-xs leading-relaxed text-sidebar-foreground/70">
            {'先自己想三分鐘，再看提示；看完詳解後，記得把題目重做一次。'}
          </p>
        </div>
        <ThemeToggle className="w-full" />
      </div>
    </div>
  )
}
