import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { Brand, CoachHint, InspectLinks, Page, TopBar } from '@/components/Chrome'
import { useNext } from '@/lib/next-store'

export function HomePage() {
  const navigate = useNavigate()
  const {
    state,
    hydrated,
    current,
    dayComplete,
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
    const t = window.setTimeout(clearHandoff, 1400)
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
        <TopBar right={<InspectLinks />} />
        <Page>
          <div className="animate-rise pt-10">
            <Brand size="hero" link={false} />
            <div className="mt-12 flex items-start gap-4">
              <CheckCircle2 className="mt-1 size-8 text-urgent-foreground" />
              <div>
                <p className="text-eyebrow text-urgent-foreground">Enough for today</p>
                <h1 className="font-display mt-3 text-[clamp(2rem,5vw,3rem)] font-semibold leading-tight tracking-tight">
                  Critical work is cleared.
                </h1>
                <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-ink-soft">
                  Not inbox zero — judgment. Here&apos;s the receipt from Joe&apos;s day
                  (illustrative prototype numbers).
                </p>

                <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                  {[
                    ['6', 'judgment calls completed'],
                    ['47 min', 'of admin avoided'],
                    ['4', 'systems updated automatically'],
                    ['3', 'drafts prepared'],
                    ['1', 'urgent risk caught before forecast'],
                    ['82 min', 'of focus time preserved'],
                  ].map(([n, label]) => (
                    <li
                      key={label}
                      className="rounded-2xl border border-border/80 bg-card/50 px-4 py-3"
                    >
                      <p className="font-display text-2xl text-urgent-foreground">{n}</p>
                      <p className="mt-1 text-sm text-ink-soft">{label}</p>
                    </li>
                  ))}
                </ul>

                <p className="mt-8 text-sm text-muted-foreground">
                  Next ran Joe&apos;s day 18 of the last 20 workdays.
                  {state.replanApplied ? ' Mid-day replan accepted.' : ''}
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
      <TopBar right={<InspectLinks />} />
      <Page>
        <div key={key} className={state.justAdvanced ? 'animate-handoff' : 'animate-rise'}>
          <div className="pt-10 sm:pt-14">
            <Brand link={false} />
          </div>

          {!state.coachDismissed && (
            <div className="mt-8">
              <CoachHint onDismiss={() => update({ coachDismissed: true })} />
            </div>
          )}

          {state.justAdvanced && (
            <p className="mt-6 text-sm text-urgent-foreground">
              {state.replanApplied ? 'Plan updated. Onto the next thing.' : 'Onto the next thing.'}
            </p>
          )}

          <section className="mt-12 max-w-xl">
            <p className="text-eyebrow text-urgent-foreground">Next</p>
            <h1 className="font-display mt-3 text-[clamp(2rem,5.5vw,3.1rem)] font-semibold leading-[1.05] tracking-tight">
              {current.title}
            </h1>
            <p className="mt-5 text-[16px] leading-relaxed text-ink-soft">{current.why}</p>
            <p className="mt-4 text-sm text-muted-foreground">
              Estimated time:{' '}
              <span className="text-foreground">{current.effort}</span>
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={() => navigate(`/task/${current.id}`)}
                className="group inline-flex h-16 items-center justify-center gap-3 rounded-2xl bg-urgent px-10 font-display text-2xl font-semibold text-urgent-foreground shadow-[var(--shadow-urgent)] transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0"
              >
                Start
                <ArrowRight className="size-6 transition-transform duration-200 group-hover:translate-x-1" />
              </button>
              <button
                type="button"
                onClick={skipAction}
                className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
              >
                Not this
              </button>
            </div>
          </section>
        </div>
      </Page>
    </>
  )
}
