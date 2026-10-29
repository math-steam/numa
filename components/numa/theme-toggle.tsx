'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { cn } from '@/lib/utils'

export function ThemeToggle({ className }: { className?: string }) {
  const { setTheme } = useTheme()

  return (
    <div
      role="group"
      aria-label="切換背景模式"
      className={cn('inline-flex items-center gap-1 rounded-lg bg-sidebar-accent p-1', className)}
    >
      {(
        [
          {
            value: 'light',
            label: '淺色',
            Icon: Sun,
            activeClass:
              'bg-sidebar-primary text-sidebar-primary-foreground dark:bg-transparent dark:text-sidebar-foreground/70',
          },
          {
            value: 'dark',
            label: '深色',
            Icon: Moon,
            activeClass:
              'text-sidebar-foreground/70 dark:bg-sidebar-primary dark:text-sidebar-primary-foreground',
          },
        ] as const
      ).map(({ value, label, Icon, activeClass }) => {
        return (
          <button
            key={value}
            type="button"
            onClick={() => setTheme(value)}
            aria-label={`切換為${label}模式`}
            className={cn(
              'flex flex-1 items-center justify-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors',
              activeClass,
            )}
          >
            <Icon className="size-3.5" aria-hidden="true" />
            {label}
          </button>
        )
      })}
    </div>
  )
}
