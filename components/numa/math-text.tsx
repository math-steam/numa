import katex from 'katex'
import { Fragment } from 'react'
import { cn } from '@/lib/utils'

const MATH_PATTERN = /(\$\$[\s\S]+?\$\$|\\\[[\s\S]+?\\\]|\\\([\s\S]+?\\\)|\$[^$\n]+?\$)/g
const BOLD_PATTERN = /(\*\*[^*]+\*\*)/g

function renderMath(source: string, displayMode: boolean) {
  return katex.renderToString(source, {
    displayMode,
    throwOnError: false,
    strict: 'ignore',
    trust: false,
  })
}

function renderText(text: string, keyPrefix: string) {
  return text.split(BOLD_PATTERN).map((chunk, index) => {
    if (chunk.startsWith('**') && chunk.endsWith('**') && chunk.length > 4) {
      return (
        <strong key={`${keyPrefix}-${index}`} className="font-semibold text-foreground">
          {chunk.slice(2, -2)}
        </strong>
      )
    }
    return <Fragment key={`${keyPrefix}-${index}`}>{chunk}</Fragment>
  })
}

export function MathText({ children, className }: { children: string; className?: string }) {
  const segments = children.split(MATH_PATTERN)

  return (
    <div className={cn('leading-relaxed whitespace-pre-line', className)}>
      {segments.map((segment, index) => {
        if (!segment) return null
        const key = `seg-${index}`
        if (segment.startsWith('$$') && segment.endsWith('$$')) {
          return <span key={key} className="block" dangerouslySetInnerHTML={{ __html: renderMath(segment.slice(2, -2), true) }} />
        }
        if (segment.startsWith('\\[') && segment.endsWith('\\]')) {
          return <span key={key} className="block" dangerouslySetInnerHTML={{ __html: renderMath(segment.slice(2, -2), true) }} />
        }
        if (segment.startsWith('\\(') && segment.endsWith('\\)')) {
          return <span key={key} dangerouslySetInnerHTML={{ __html: renderMath(segment.slice(2, -2), false) }} />
        }
        if (segment.startsWith('$') && segment.endsWith('$') && segment.length > 2) {
          return <span key={key} dangerouslySetInnerHTML={{ __html: renderMath(segment.slice(1, -1), false) }} />
        }
        return <Fragment key={key}>{renderText(segment, key)}</Fragment>
      })}
    </div>
  )
}
