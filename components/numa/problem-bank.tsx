'use client'

import { useMemo, useState } from 'react'
import { DIFFICULTY_LABEL, type Difficulty, type ExamId } from '@/lib/numa-data'
import { cn } from '@/lib/utils'
import { ProblemCard } from './problem-card'

// 1. 引入您的 JSON 題庫
import capQuestions from '@/lib/cap_questions.json'
import gsatQuestions from '@/lib/gsat_questions.json'

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
  const [type, setType] = useState<string>(ALL) // 題型狀態：all / 選擇 / 非選
  const [difficulty, setDifficulty] = useState<Difficulty | typeof ALL>(ALL)

  // 1. 根據選取的 exam 決定使用哪個題庫來源
  const rawQuestions = (exam === 'cap' ? capQuestions : gsatQuestions) as any[]

  // 2. 動態從題庫自動提取所有不重複的「單元 (topic)」，解決網頁跟資料庫單元不一致的問題
  const dynamicTopics = useMemo(() => {
    const list = rawQuestions
      .map((q) => q.topic && String(q.topic).trim())
      .filter((t): t is string => Boolean(t))
    return Array.from(new Set(list))
  }, [rawQuestions])

  // 3. 包含單元、題型與難度 (1, 2, 3) 的過濾邏輯
  const problems = (rawQuestions || []).filter((p: any) => {
    // 單元比對
    const matchTopic =
      topic === ALL ||
      (p.topic && String(p.topic).trim() === String(topic).trim())

    // 題型比對 (選擇/非選)
    const matchType =
      type === ALL ||
      (p.type && String(p.type).trim() === String(type).trim())

    // 難度比對 (精準比對 1, 2, 3)
    const matchDifficulty =
      difficulty === ALL ||
      p.difficulty === undefined ||
      p.difficulty === null ||
      Number(p.difficulty) === Number(difficulty)

    return matchTopic && matchType && matchDifficulty
  })

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-3 rounded-xl border bg-card p-4">
        {/* 單元區塊：動態讀取 JSON 題庫中的單元 */}
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="依單元篩選">
          <span className="mr-1 text-xs font-semibold text-muted-foreground">單元</span>
          <FilterChip active={topic === ALL} onClick={() => setTopic(ALL)}>
            全部
          </FilterChip>
          {dynamicTopics.map((item) => (
            <FilterChip key={item} active={topic === item} onClick={() => setTopic(item)}>
              {item}
            </FilterChip>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-border/50 sm:flex-row">
          {/* 題型區塊 (選擇 / 非選) */}
          <div className="flex flex-wrap items-center gap-2" role="group" aria-label="依題型篩選">
            <span className="mr-1 text-xs font-semibold text-muted-foreground">題型</span>
            <FilterChip active={type === ALL} onClick={() => setType(ALL)}>
              全部
            </FilterChip>
            <FilterChip active={type === '選擇'} onClick={() => setType('選擇')}>
              選擇
            </FilterChip>
            <FilterChip active={type === '非選'} onClick={() => setType('非選')}>
              非選
            </FilterChip>
          </div>

          {/* 難度區塊 (對應 difficulty 1, 2, 3) */}
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
      </div>

      <p className="text-xs text-muted-foreground" aria-live="polite">
        {`共 ${problems.length} 題`}
      </p>

      {problems.length > 0 ? (
        <ul className="grid gap-4 md:grid-cols-2">
          {problems.map((problem: any, index: number) => (
            <li key={problem.id}>
              <ProblemCard problem={problem} index={index + 1} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="rounded-xl border border-dashed p-10 text-center text-sm text-muted-foreground">
          這個組合目前沒有題目，換個單元、題型或難度試試看。
        </div>
      )}
    </div>
  )
}