'use client'

import { Menu } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import type { ExamId } from '@/lib/numa-data'
import { AiTutor } from './ai-tutor'
import { ExamHub } from './exam-hub'
import { Hero } from './hero'
import { SidebarNav, type HubView } from './sidebar-nav'

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export function AppShell() {
  const [exam, setExam] = useState<ExamId>('gsat')
  const [view, setView] = useState<HubView>('bank')
  const [mobileOpen, setMobileOpen] = useState(false)

  const selectExam = (next: ExamId) => {
    setExam(next)
    setMobileOpen(false)
    scrollToSection('exam-hub')
  }

  const selectView = (next: HubView) => {
    setView(next)
    setMobileOpen(false)
    scrollToSection('exam-hub')
  }

  const openTutor = () => {
    setMobileOpen(false)
    scrollToSection('ai-tutor')
  }

  const nav = (
    <SidebarNav exam={exam} view={view} onSelectExam={selectExam} onSelectView={selectView} onOpenTutor={openTutor} />
  )

  return (
    <div className="min-h-dvh bg-background">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-72 border-r border-sidebar-border lg:block">{nav}</aside>

      <header className="sticky top-0 z-20 flex items-center justify-between border-b border-sidebar-border bg-sidebar px-4 py-3 text-sidebar-foreground lg:hidden">
        <div className="flex items-center gap-2.5">
          <Image src="/numa-mascot.png" alt="" width={32} height={32} className="size-8 rounded-lg" />
          <span className="font-black tracking-wide">數之本</span>
          <span className="font-mono text-xs tracking-[0.25em] text-sidebar-primary">NUMA</span>
        </div>
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger
            className="inline-flex size-9 items-center justify-center rounded-lg hover:bg-sidebar-accent"
            aria-label="開啟選單"
          >
            <Menu className="size-5" aria-hidden="true" />
          </SheetTrigger>
          <SheetContent side="left" className="w-72 max-w-[85vw] border-sidebar-border bg-sidebar p-0 text-sidebar-foreground">
            <SheetTitle className="sr-only">數之本 NUMA 選單</SheetTitle>
            {nav}
          </SheetContent>
        </Sheet>
      </header>

      <main id="top" className="lg:pl-72">
        <div className="mx-auto flex max-w-6xl flex-col gap-16 px-4 py-8 sm:px-6 lg:px-10 lg:py-12">
          <Hero onStart={() => selectView('bank')} onOpenTutor={openTutor} />
          <ExamHub exam={exam} view={view} onExamChange={setExam} onViewChange={setView} />
          <AiTutor />
        </div>
        <footer className="border-t px-4 py-8 text-center text-xs text-muted-foreground sm:px-6 lg:px-10">
          {'© 2026 數之本 NUMA · 考試日期與級分資訊僅供參考，請以大考中心與心測中心官方公告為準。'}
        </footer>
      </main>
    </div>
  )
}
