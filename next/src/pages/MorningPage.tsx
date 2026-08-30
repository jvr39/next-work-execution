import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Brand, Page, TopBar } from '@/components/Chrome'
import { briefing } from '@/lib/next-data'
import { useNext } from '@/lib/next-store'

export function MorningPage() {
  const navigate = useNavigate()
  const { state, hydrated, update, current } = useNext()
  const [showRoute, setShowRoute] = useState(false)

  useEffect(() => {
    if (!hydrated) return
    if (!state.seenLanding) navigate('/')
  }, [hydrated, state.seenLanding, navigate])

  const firstTitle = current?.title ?? briefing.timeline[0]?.label

  return (
    <>
      <TopBar right={<span>Today · 7:12 AM · scripted demo</span>} />
      <Page>
        <div className="animate-rise pt-8">
          <Brand size="hero" link={false} />
          <p className="text-eyebrow mt-8">Morning · risk before inbox</p>

          <h1 className="font-display mt-4 max-w-2xl text-[clamp(1.9rem,4.6vw,2.75rem)] font-semibold leading-[1.12] tracking-tight">
            {briefing.biggestChange}
          </h1>

          <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-ink-soft">
            {briefing.rearranged} You have{' '}
            <span className="text-foreground">{briefing.usableTime}</span> of usable time. About{' '}
            {briefing.needToday} things need you today — you&apos;ll see them one at a time.
          </p>

          <p className="mt-8 max-w-xl font-display text-xl leading-snug">
            First Next:{' '}
            <span className="text-urgent-foreground">{firstTitle}</span>
          </p>
        </div>

        <div className="mt-10">
          <button
            type="button"
            onClick={() => {
              update({ seenLanding: true, onboarded: true, dayStarted: true })
              navigate('/home')
            }}
            className="group inline-flex items-center gap-3 rounded-2xl bg-urgent px-10 py-5 font-display text-2xl font-semibold text-urgent-foreground shadow-[var(--shadow-urgent)] transition-transform duration-200 hover:-translate-y-0.5"
          >
            Start my day
            <ArrowRight className="size-6 transition-transform duration-200 group-hover:translate-x-1" />
          </button>

          <button
            type="button"
            onClick={() => setShowRoute((v) => !v)}
            className="mt-6 block text-[12px] tracking-wide text-muted-foreground uppercase hover:text-foreground"
          >
            {showRoute ? 'Hide draft route' : 'See draft route'}
          </button>

          {showRoute && (
            <ul className="animate-rise mt-4 max-w-lg space-y-2 border-l border-border pl-4 text-sm text-ink-soft">
              {briefing.timeline.map((item) => (
                <li key={item.label}>
                  <span className="text-muted-foreground">{item.time}</span> · {item.label}
                  {item.urgent ? ' · moved up' : ''}
                </li>
              ))}
            </ul>
          )}

          <p className="mt-10 max-w-md text-[12px] leading-relaxed text-muted-foreground">
            Scripted demo with clean fictional data. It shows the loop we want — not proof we can
            assemble messy CRM/Gong/Slack context yet.
          </p>
        </div>
      </Page>
    </>
  )
}
