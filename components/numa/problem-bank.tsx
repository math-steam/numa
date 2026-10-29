'use client'

import { useState } from 'react'
import { DIFFICULTY_LABEL, PROBLEMS, TOPICS_BY_EXAM, type Difficulty, type ExamId } from '@/lib/numa-data'
import { cn } from '@/lib/utils'
import { ProblemCard } from './problem-card'

const ALL = 'all'

function FilterChip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'rounded-full border px-3 py-1 text-xs font-medium transition-colors',
        active ? 'border-foreground bg-foreground text-background' : 'bg-card text-muted-foreground hover:text-foreground',
      )}
    >
      {children}
    </button>
  )
}

export function ProblemBank({ exam }: { exam: ExamId }) {
  const [topic, setTopic] = useState<string>(ALL)
  const [difficulty, setDifficulty] = useState<Difficulty | typeof ALL>(ALL)

  const problems = PROBLEMS.filter(
    (p) => p.exam === exam && (topic === ALL || p.topic === topic) && (difficulty === ALL || p.difficulty === difficulty),
  )

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-3 rounded-xl border bg-card p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="依單元篩選">
          <span className="mr-1 text-xs font-semibold text-muted-foreground">單元</span>
          <FilterChip active={topic === ALL} onClick={() => setTopic(ALL)}>
            全部
          </FilterChip>
          {TOPICS_BY_EXAM[exam].map((item) => (
            <FilterChip key={item} active={topic === item} onClick={() => setTopic(item)}>
              {item}
            </FilterChip>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="依難度篩選">
          <span className="mr-1 text-xs font-semibold text-muted-foreground">難度</span>
          <FilterChip active={difficulty === ALL} onClick={() => setDifficulty(ALL)}>
            全部
          </FilterChip>
          {([1, 2, 3] as const).map((level) => (
            <FilterChip key={level} active={difficulty === level} onClick={() => setDifficulty(level)}>
              {DIFFICULTY_LABEL[level]}
            </FilterChip>
          ))}
        </div>
      </div>

      <p className="text-xs text-muted-foreground" aria-live="polite">
        {`共 ${problems.length} 題`}
      </p>

      {problems.length > 0 ? (
        <ul className="grid gap-4 md:grid-cols-2">
          {problems.map((problem, index) => (
            <li key={problem.id}>
              <ProblemCard problem={problem} index={index + 1} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="rounded-xl border border-dashed p-10 text-center text-sm text-muted-foreground">
          這個組合目前沒有題目，換個單元或難度試試看。
        </div>
      )}
    </div>
  )
}
