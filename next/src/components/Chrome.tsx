import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'
import { interruptEvent, type WorkLevel } from '@/lib/next-data'
import { useNext } from '@/lib/next-store'
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
    size === 'sm'
      ? 'text-xl font-semibold'
      : 'text-[clamp(3.5rem,11vw,7rem)] font-semibold leading-[0.9]',
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

  if (!link) return <span className={classes}>{content}</span>
  return (
    <Link to="/home" className={classes}>
      {content}
    </Link>
  )
}

export function TopBar({ right }: { right?: ReactNode }) {
  return (
    <header className="relative z-10 mx-auto flex w-full max-w-3xl items-center justify-between px-6 pt-7 pb-2">
      <Brand />
      <div className="flex flex-wrap items-center justify-end gap-x-4 gap-y-2 text-xs text-muted-foreground">
        {right}
      </div>
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
    <main className={cn('relative z-10 mx-auto w-full max-w-3xl px-6 pb-28', className)}>
      {children}
    </main>
  )
}

export function NavLinks() {
  return <InspectLinks />
}

/** Demo inspection — not everyday product nav */
export function InspectLinks() {
  return (
    <details className="relative">
      <summary className="cursor-pointer list-none text-xs text-muted-foreground transition-colors hover:text-foreground">
        How Next knows
      </summary>
      <div className="absolute right-0 z-20 mt-2 min-w-40 rounded-xl border border-border bg-card/95 p-2 shadow-[var(--shadow-lift)] backdrop-blur-md">
        <Link
          to="/morning"
          className="block rounded-lg px-3 py-2 text-xs text-ink-soft hover:bg-secondary/80 hover:text-foreground"
        >
          Briefing
        </Link>
        <Link
          to="/role"
          className="block rounded-lg px-3 py-2 text-xs text-ink-soft hover:bg-secondary/80 hover:text-foreground"
        >
          Role
        </Link>
      </div>
    </details>
  )
}

export function DemoBar() {
  const { openInterrupt, enterMidday, resetDemo, state, progress, hydrated } = useNext()
  if (!hydrated || !state.seenLanding) return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border/80 bg-card/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-3xl flex-wrap items-center gap-2 px-4 py-2.5 text-[11px] text-muted-foreground sm:gap-3">
        <span className="font-display text-[10px] tracking-[0.18em] text-urgent-foreground uppercase">
          Prototype
        </span>
        <span className="hidden sm:inline">
          {progress.done}/{progress.total} done
          {state.replanApplied ? ' · replanned' : ''}
        </span>
        <div className="ml-auto flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={openInterrupt}
            className="rounded-full border border-border px-3 py-1 transition-colors hover:border-urgent hover:text-urgent-foreground"
          >
            Simulate interrupt
          </button>
          <button
            type="button"
            onClick={enterMidday}
            className="rounded-full border border-border px-3 py-1 transition-colors hover:text-foreground"
          >
            Jump to mid-day
          </button>
          <button
            type="button"
            onClick={() => {
              resetDemo()
              window.location.hash = '#/'
              window.location.reload()
            }}
            className="rounded-full border border-border px-3 py-1 transition-colors hover:text-foreground"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  )
}

export function InterruptModal() {
  const { state, applyReplan, dismissInterrupt } = useNext()
  if (!state.interruptOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-ink/35 p-4 backdrop-blur-[2px] sm:items-center">
      <div className="animate-morph surface w-full max-w-lg rounded-3xl p-6 sm:p-8">
        <p className="text-eyebrow text-urgent-foreground">Route changing</p>
        <h2 className="font-display mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
          New information. New Next.
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">Scripted example — not live Slack reading.</p>
        <div className="mt-5 rounded-2xl bg-secondary/70 p-4">
          <p className="text-[12px] tracking-wide text-muted-foreground uppercase">
            {interruptEvent.from} · {interruptEvent.channel}
          </p>
          <p className="mt-2 text-[15px] leading-relaxed text-foreground">
            “{interruptEvent.message}”
          </p>
        </div>
        <p className="mt-5 text-[15px] leading-relaxed text-ink-soft">{interruptEvent.effect}</p>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={applyReplan}
            className="inline-flex h-12 flex-1 items-center justify-center rounded-xl bg-urgent px-5 font-display text-base font-semibold text-urgent-foreground shadow-[var(--shadow-urgent)]"
          >
            Accept new route
          </button>
          <button
            type="button"
            onClick={dismissInterrupt}
            className="inline-flex h-12 items-center justify-center rounded-xl border border-input px-5 text-sm text-ink-soft"
          >
            Keep current plan
          </button>
        </div>
      </div>
    </div>
  )
}

export function CoachHint({ onDismiss }: { onDismiss: () => void }) {
  return (
    <div className="animate-rise mb-8 rounded-2xl border border-urgent/30 bg-urgent/10 px-4 py-3 text-[13px] leading-relaxed text-urgent-foreground">
      <div className="flex items-start justify-between gap-3">
        <p>
          <span className="font-medium">One Next. Then Done.</span> After the first task, hit
          Simulate interrupt for a scripted replan. That feeling is the bet — the detection is not
          built yet.
        </p>
        <button
          type="button"
          onClick={onDismiss}
          className="shrink-0 text-[11px] tracking-wide uppercase opacity-70 hover:opacity-100"
        >
          Got it
        </button>
      </div>
    </div>
  )
}
