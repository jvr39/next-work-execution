import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Brand, Page, TopBar } from '@/components/Chrome'
import { briefing } from '@/lib/next-data'
import { useNext } from '@/lib/next-store'
import { cn } from '@/lib/utils'

export function MorningPage() {
  const navigate = useNavigate()
  const { state, hydrated, update } = useNext()

  useEffect(() => {
    if (!hydrated) return
    if (!state.seenLanding) navigate('/')
  }, [hydrated, state.seenLanding, navigate])

  return (
    <>
      <TopBar right={<span>Today · 7:12 AM · demo</span>} />
      <Page>
        <div className="animate-rise pt-8">
          <Brand size="hero" link={false} className="select-none" />
          <p className="text-eyebrow mt-8">Morning briefing</p>

          <h1 className="font-display mt-4 max-w-3xl text-[clamp(1.9rem,4.6vw,2.9rem)] font-semibold leading-[1.12] tracking-tight">
            {briefing.greeting} You have{' '}
            <span className="text-urgent-foreground">{briefing.usableTime}</span> of usable work
            time today.
          </h1>

          <p className="mt-6 max-w-2xl text-[16px] leading-relaxed text-ink-soft">
            I found {briefing.found} things that could use your attention. Only {briefing.needToday}{' '}
            need you today. The biggest change overnight:{' '}
            <span className="text-foreground">{briefing.biggestChange}</span> {briefing.rearranged}
          </p>
        </div>

        <section className="animate-rise-slow mt-14">
          <p className="text-eyebrow">Your day, as drafted</p>
          <ul className="mt-5">
            {briefing.timeline.map((item) => (
              <li
                key={item.label}
                className="flex items-baseline gap-5 border-b border-border py-4"
              >
                <span className="font-display w-14 shrink-0 text-sm text-muted-foreground">
                  {item.time}
                </span>
                <span
                  className={cn(
                    'flex-1 text-[15px]',
                    item.urgent ? 'text-foreground' : 'text-ink-soft',
                  )}
                >
                  {item.label}
                </span>
                <span
                  className={cn(
                    'shrink-0 text-[11px] tracking-wide',
                    item.urgent ? 'text-urgent-foreground' : 'text-muted-foreground',
                  )}
                >
                  {item.tag}
                </span>
              </li>
            ))}
          </ul>

          <p className="mt-6 text-sm text-muted-foreground">
            Everything else — research, drafting, data cleanup — I&apos;m handling in the
            background. You&apos;ll only see it when it needs your approval.
          </p>

          <button
            type="button"
            onClick={() => {
              update({ seenLanding: true, onboarded: true, dayStarted: true })
              navigate('/home')
            }}
            className="group mt-10 inline-flex items-center gap-3 rounded-2xl bg-urgent px-10 py-5 font-display text-2xl font-semibold text-urgent-foreground shadow-[var(--shadow-urgent)] transition-transform duration-200 hover:-translate-y-0.5"
          >
            Start my day
            <ArrowRight className="size-6 transition-transform duration-200 group-hover:translate-x-1" />
          </button>
        </section>
      </Page>
    </>
  )
}
