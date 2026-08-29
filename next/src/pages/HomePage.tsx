import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import {
  Brand,
  CoachHint,
  LevelLabel,
  NavLinks,
  Page,
  TopBar,
} from '@/components/Chrome'
import { briefing } from '@/lib/next-data'
import { useNext } from '@/lib/next-store'

export function HomePage() {
  const navigate = useNavigate()
  const {
    state,
    hydrated,
    current,
    upcoming,
    dayComplete,
    progress,
    skipAction,
    clearHandoff,
    update,
  } = useNext()
  const [key, setKey] = useState(0)

  useEffect(() => {
    if (!hydrated) return
    if (!state.seenLanding) navigate('/')
    else if (!state.onboarded) navigate('/onboarding')
    else if (!state.dayStarted) navigate('/morning')
  }, [hydrated, state.seenLanding, state.onboarded, state.dayStarted, navigate])

  useEffect(() => {
    setKey((k) => k + 1)
  }, [current?.id, state.replanApplied])

  useEffect(() => {
    if (!state.justAdvanced) return
    const t = window.setTimeout(clearHandoff, 2200)
    return () => window.clearTimeout(t)
  }, [state.justAdvanced, clearHandoff])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
      if (e.key === 'n' || e.key === 'N') {
        if (current) navigate(`/task/${current.id}`)
      }
      if (e.key === 's' || e.key === 'S') skipAction()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [current, navigate, skipAction])

  if (!hydrated) return null

  if (dayComplete) {
    return (
      <>
        <TopBar right={<NavLinks />} />
        <Page>
          <div className="animate-rise pt-10">
            <Brand size="hero" link={false} className="select-none" />
            <div className="mt-12 flex items-start gap-4">
              <CheckCircle2 className="mt-1 size-8 text-urgent-foreground" />
              <div>
                <p className="text-eyebrow text-urgent-foreground">Day complete</p>
                <h1 className="font-display mt-3 text-[clamp(2rem,5vw,3rem)] font-semibold leading-tight tracking-tight">
                  Critical work is cleared.
                </h1>
                <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-ink-soft">
                  You finished {progress.total} things that actually needed you. Background work —
                  briefs, drafts, data pulls — stayed invisible. That&apos;s the product.
                </p>
                <p className="mt-6 text-sm text-muted-foreground">
                  {state.replanApplied
                    ? 'You also felt a mid-day replan — the Waze moment.'
                    : 'Try Reset + Simulate Slack interrupt next time to feel the replan.'}
                </p>
              </div>
            </div>
          </div>
        </Page>
      </>
    )
  }

  if (!current) return null

  return (
    <>
      <TopBar right={<NavLinks />} />
      <Page>
        <div key={key} className={state.justAdvanced ? 'animate-handoff' : 'animate-rise'}>
          <div className="pt-6 sm:pt-10">
            <Brand size="hero" link={false} className="select-none" />
          </div>

          {!state.coachDismissed && (
            <div className="mt-8">
              <CoachHint onDismiss={() => update({ coachDismissed: true })} />
            </div>
          )}

          {state.justAdvanced && (
            <p className="mt-6 text-sm text-urgent-foreground">
              {state.replanApplied && progress.done <= 2
                ? 'Route updated. Onto the next thing.'
                : 'Onto the next thing.'}
            </p>
          )}

          <section className="mt-10">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <span className="text-eyebrow text-urgent-foreground">Now</span>
              <span className="font-display text-sm text-ink-soft">{current.window}</span>
              <LevelLabel level={current.level} />
            </div>

            <h1 className="font-display mt-4 text-[clamp(2rem,5.5vw,3.25rem)] font-semibold leading-[1.05] tracking-tight">
              {current.title}
            </h1>

            {current.calendarConstraint && (
              <p className="mt-3 text-sm text-muted-foreground">
                Calendar · <span className="text-foreground">{current.calendarConstraint}</span>
              </p>
            )}

            <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-ink-soft">
              <span className="text-eyebrow mr-2 align-middle">Why</span>
              {current.why}
            </p>

            <div className="mt-8">
              <p className="text-eyebrow">Do this</p>
              <ol className="mt-3 space-y-3">
                {current.steps.map((step, i) => (
                  <li key={step} className="flex gap-4 text-[15px] leading-relaxed">
                    <span className="font-display mt-0.5 w-5 shrink-0 text-right text-sm text-urgent-foreground">
                      {i + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <p className="mt-7 text-sm text-muted-foreground">
              Estimated effort <span className="text-foreground">{current.effort}</span> · counts
              toward {current.responsibility.toLowerCase()} · {progress.done}/{progress.total} today
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={() => navigate(`/task/${current.id}`)}
                className="group inline-flex h-16 items-center justify-center gap-3 rounded-2xl bg-urgent px-10 font-display text-2xl font-semibold text-urgent-foreground shadow-[var(--shadow-urgent)] transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0 sm:h-20 sm:min-w-48 sm:text-3xl"
              >
                Next
                <ArrowRight className="size-6 transition-transform duration-200 group-hover:translate-x-1" />
              </button>
              <button
                type="button"
                onClick={skipAction}
                className="inline-flex h-16 items-center justify-center rounded-2xl border border-input px-8 font-display text-lg text-ink-soft transition-colors hover:bg-secondary/70 sm:h-20"
              >
                Not now — skip
              </button>
            </div>
            <p className="mt-3 text-[12px] text-muted-foreground">Keyboard: N start · S skip</p>
          </section>

          <section className="mt-16">
            <p className="text-eyebrow">Up next</p>
            <ul className="mt-4 divide-y divide-border">
              {upcoming.length === 0 ? (
                <li className="py-3 text-[15px] text-ink-soft">
                  Last item in the route — finish this and you&apos;re clear.
                </li>
              ) : (
                upcoming.map((item) => (
                  <li key={item.id} className="flex items-baseline gap-5 py-3 text-[15px]">
                    <span className="font-display w-24 shrink-0 text-sm text-muted-foreground">
                      {item.window.split('–')[0]}
                    </span>
                    <span className="text-ink-soft">{item.title}</span>
                  </li>
                ))
              )}
            </ul>
          </section>

          <p className="hairline mt-12 pt-6 text-sm text-muted-foreground">
            {briefing.nextMeeting.minutesUntil} min before {briefing.nextMeeting.time}{' '}
            {briefing.nextMeeting.label}. On track for critical work by{' '}
            <span className="text-foreground">{briefing.finishBy}</span>.
          </p>
        </div>
      </Page>
    </>
  )
}
