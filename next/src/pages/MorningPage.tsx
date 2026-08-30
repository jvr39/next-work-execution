import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Brand, Page, TopBar } from '@/components/Chrome'
import { briefing } from '@/lib/next-data'
import { useNext } from '@/lib/next-store'

export function MorningPage() {
  const navigate = useNavigate()
  const { state, hydrated, update, current } = useNext()

  useEffect(() => {
    if (!hydrated) return
    if (!state.seenLanding) navigate('/')
  }, [hydrated, state.seenLanding, navigate])

  const firstTitle = current?.title ?? 'Review Acme renewal risk'

  return (
    <>
      <TopBar right={<span>Today · 7:12 AM</span>} />
      <Page>
        <div className="animate-rise pt-8">
          <Brand size="hero" link={false} />
          <p className="text-eyebrow mt-8">Morning</p>
          <h1 className="font-display mt-4 max-w-2xl text-[clamp(1.9rem,4.6vw,2.75rem)] font-semibold leading-[1.12] tracking-tight">
            {briefing.biggestChange}
          </h1>
          <p className="mt-8 max-w-xl font-display text-2xl leading-snug">
            Next:{' '}
            <span className="text-urgent-foreground">{firstTitle}</span>
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            Estimated time: {current?.effort ?? '20 min'}
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            update({ seenLanding: true, onboarded: true, dayStarted: true })
            navigate('/home')
          }}
          className="group mt-12 inline-flex items-center gap-3 rounded-2xl bg-urgent px-10 py-5 font-display text-2xl font-semibold text-urgent-foreground shadow-[var(--shadow-urgent)] transition-transform duration-200 hover:-translate-y-0.5"
        >
          Start
          <ArrowRight className="size-6 transition-transform duration-200 group-hover:translate-x-1" />
        </button>
      </Page>
    </>
  )
}
