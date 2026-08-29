import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import type { WorkLevel } from '@/lib/next-data'
import { cn } from '@/lib/utils'

export function Brand({
  className,
  size = 'sm',
  link = true,
}: {
  className?: string
  size?: 'sm' | 'hero'
  link?: boolean
}) {
  const classes = cn(
    'font-display inline-flex items-baseline tracking-tight text-foreground',
    size === 'sm' ? 'text-xl font-semibold' : 'text-[clamp(3.5rem,11vw,7rem)] font-semibold leading-[0.9]',
    className,
  )

  const content = (
    <>
      Next
      <span
        className={cn(
          'ml-1 rounded-full bg-urgent',
          size === 'sm' ? 'size-1.5' : 'size-3 animate-breathe',
        )}
      />
    </>
  )

  if (!link) {
    return <span className={classes}>{content}</span>
  }

  return (
    <Link to="/" className={classes}>
      {content}
    </Link>
  )
}

export function TopBar({ right }: { right?: ReactNode }) {
  return (
    <header className="relative z-10 mx-auto flex w-full max-w-3xl items-center justify-between px-6 pt-7 pb-2">
      <Brand />
      <div className="flex items-center gap-4 text-xs text-muted-foreground">{right}</div>
    </header>
  )
}

export function LevelLabel({ level, className }: { level: WorkLevel; className?: string }) {
  const isAi = level === 'ai-prepared'
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] tracking-wide',
        isAi
          ? 'border-urgent/40 bg-urgent/10 text-urgent-foreground'
          : 'border-border bg-secondary/60 text-muted-foreground',
        className,
      )}
    >
      <span className={cn('size-1.5 rounded-full', isAi ? 'bg-urgent' : 'bg-muted-foreground')} />
      {isAi ? 'AI prepared · awaiting your approval' : 'You do this'}
    </span>
  )
}

export function Page({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <main className={cn('relative z-10 mx-auto w-full max-w-3xl px-6 pb-24', className)}>
      {children}
    </main>
  )
}
