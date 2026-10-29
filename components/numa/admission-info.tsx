import { CalendarDays, Lightbulb, Users } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { ADMISSION, EXAMS, type ExamId } from '@/lib/numa-data'

export function AdmissionInfo({ exam }: { exam: ExamId }) {
  const info = ADMISSION[exam]
  const meta = EXAMS.find((item) => item.id === exam) ?? EXAMS[0]

  return (
    <div className="grid gap-5 lg:grid-cols-5">
      <section aria-labelledby={`${exam}-timeline`} className="rounded-xl border bg-card p-5 lg:col-span-2">
        <h3 id={`${exam}-timeline`} className="flex items-center gap-2 font-bold">
          <CalendarDays className="size-4 text-brand" aria-hidden="true" />
          {`${meta.name} 重要時程`}
        </h3>
        <ol className="mt-5 flex flex-col">
          {info.timeline.map((item, index) => (
            <li key={item.label} className="relative flex gap-4 pb-5 last:pb-0">
              {index < info.timeline.length - 1 && (
                <span className="absolute top-3 left-[5px] h-full w-px bg-border" aria-hidden="true" />
              )}
              <span className="relative mt-1.5 size-[11px] shrink-0 rounded-full border-2 border-brand bg-card" aria-hidden="true" />
              <div className="flex flex-col gap-0.5">
                <span className="font-mono text-xs text-muted-foreground">{item.date}</span>
                <span className="text-sm font-semibold">{item.label}</span>
                <span className="text-xs text-muted-foreground">{item.note}</span>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby={`${exam}-scores`} className="flex flex-col rounded-xl border bg-card p-5 lg:col-span-3">
        <h3 id={`${exam}-scores`} className="font-bold">
          {info.scoreTable.title}
        </h3>
        <div className="mt-4 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                {info.scoreTable.headers.map((header) => (
                  <TableHead key={header} className="whitespace-nowrap">
                    {header}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {info.scoreTable.rows.map((row) => (
                <TableRow key={row.join('-')}>
                  {row.map((cell, index) => (
                    <TableCell
                      key={`${cell}-${index}`}
                      className={index === 1 || index === 3 ? 'font-mono whitespace-nowrap' : 'whitespace-nowrap'}
                    >
                      {cell}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <p className="mt-4 text-xs leading-relaxed text-muted-foreground">{info.scoreTable.note}</p>
      </section>

      <section aria-labelledby={`${exam}-quotas`} className="rounded-xl bg-sidebar p-5 text-sidebar-foreground lg:col-span-2">
        <h3 id={`${exam}-quotas`} className="flex items-center gap-2 font-bold">
          <Users className="size-4 text-sidebar-primary" aria-hidden="true" />
          升學管道與名額
        </h3>
        <dl className="mt-4 flex flex-col divide-y divide-sidebar-border">
          {info.quotas.map((item) => (
            <div key={item.label} className="flex items-center justify-between gap-4 py-3">
              <div>
                <dt className="text-sm font-semibold">{item.label}</dt>
                <p className="text-xs text-sidebar-foreground/60">{item.description}</p>
              </div>
              <dd className="shrink-0 font-mono text-sm font-semibold text-sidebar-primary">{item.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby={`${exam}-strategy`} className="rounded-xl border bg-card p-5 lg:col-span-3">
        <h3 id={`${exam}-strategy`} className="flex items-center gap-2 font-bold">
          <Lightbulb className="size-4 text-brand" aria-hidden="true" />
          數學備考策略
        </h3>
        <ul className="mt-4 grid gap-3 sm:grid-cols-3">
          {info.strategies.map((item) => (
            <li key={item.title} className="rounded-lg bg-muted p-4">
              <p className="text-sm font-semibold">{item.title}</p>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{item.body}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
