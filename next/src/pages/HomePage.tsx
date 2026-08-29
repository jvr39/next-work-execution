import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Brand, LevelLabel, Page, TopBar } from '@/components/Chrome'
import { briefing } from '@/lib/next-data'
import { currentAction, remainingQueue, useNextState } from '@/lib/next-store'

export function HomePage() {
  const navigate = useNavigate()
  const { state, hydrated, advance, clearHandoff } = useNextState()
  const action = currentAction(state.queueIndex)
  const upcoming = remainingQueue(state.queueIndex, state.completed)
  const [key, setKey] = useState(0)

  useEffect(() => {
    if (hydrated && !state.onboarded) navigate('/onboarding')
  }, [hydrated, state.onboarded, navigate])

  useEffect(() => {
    setKey((k) => k + 1)
  }, [state.queueIndex])

  useEffect(() => {
    if (!state.justAdvanced) return
    const t = window.setTimeout(clearHandoff, 2200)
    return () => window.clearTimeout(t)
  }, [state.justAdvanced, clearHandoff])

  if (!hydrated) return null

  return (
    <>
      <TopBar
        right={
          <>
            <Link to="/morning" className="transition-colors hover:text-foreground">
              Briefing
            </Link>
            <Link to="/onboarding" className="transition-colors hover:text-foreground">
              Role
            </Link>
          </>
        }
      />
      <Page>
        <div key={key} className={state.justAdvanced ? 'animate-handoff' : 'animate-rise'}>
          <div className="pt-6 sm:pt-10">
            <Brand size="hero" link={false} className="select-none" />
          </div>

          {state.justAdvanced && (
            <p className="mt-6 text-sm text-urgent-foreground">Onto the next thing.</p>
          )}

          <section className="mt-10">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <span className="text-eyebrow text-urgent-foreground">Now</span>
              <span className="font-display text-sm text-ink-soft">{action.window}</span>
              <LevelLabel level={action.level} />
            </div>

            <h1 className="font-display mt-4 text-[clamp(2rem,5.5vw,3.25rem)] font-semibold leading-[1.05] tracking-tight">
              {action.title}
            </h1>

            <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-ink-soft">
              <span className="text-eyebrow mr-2 align-middle">Why</span>
              {action.why}
            </p>

            <div className="mt-8">
              <p className="text-eyebrow">Do this</p>
              <ol className="mt-3 space-y-3">
                {action.steps.map((step, i) => (
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
              Estimated effort <span className="text-foreground">{action.effort}</span> · counts toward{' '}
              {action.responsibility.toLowerCase()}
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={() => navigate(`/task/${action.id}`)}
                className="group inline-flex h-16 items-center justify-center gap-3 rounded-2xl bg-urgent px-10 font-display text-2xl font-semibold text-urgent-foreground shadow-[var(--shadow-urgent)] transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0 sm:h-20 sm:min-w-48 sm:text-3xl"
              >
                Next
                <ArrowRight className="size-6 transition-transform duration-200 group-hover:translate-x-1" />
              </button>
              <button
                type="button"
                onClick={advance}
                className="inline-flex h-16 items-center justify-center rounded-2xl border border-input px-8 font-display text-lg text-ink-soft transition-colors hover:bg-secondary/70 sm:h-20"
              >
                Not now — skip
              </button>
            </div>
          </section>

          <section className="mt-16">
            <p className="text-eyebrow">Up next</p>
            <ul className="mt-4 divide-y divide-border">
              {upcoming.length === 0 ? (
                <li className="py-3 text-[15px] text-ink-soft">Queue clear — critical work is done.</li>
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
            You&apos;re on track to finish today&apos;s critical work by{' '}
            <span className="text-foreground">{briefing.finishBy}</span>.
          </p>
        </div>
      </Page>
    </>
  )
}
