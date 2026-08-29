import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Brand, Page } from '@/components/Chrome'
import { prototypeGuide } from '@/lib/next-data'
import { useNext } from '@/lib/next-store'

export function LandingPage() {
  const navigate = useNavigate()
  const { enterDemo, update, hydrated } = useNext()

  if (!hydrated) return null

  return (
    <Page className="pt-10 sm:pt-16">
      <div className="animate-rise">
        <p className="text-eyebrow text-urgent-foreground">Interactive prototype</p>
        <Brand size="hero" link={false} className="mt-4 select-none" />
        <h1 className="font-display mt-8 max-w-2xl text-[clamp(1.8rem,4.5vw,2.75rem)] font-semibold leading-[1.12] tracking-tight">
          A work execution system whose only job is to answer:{' '}
          <span className="text-urgent-foreground">What should I do next?</span>
        </h1>
        <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-ink-soft">
          You&apos;re stepping into a day in the life of Joe, a Customer Success director. No real
          Slack or CRM — the point is the feeling: open the app, follow the route, stop managing a
          to-do list.
        </p>
      </div>

      <div className="animate-rise-slow mt-10 grid gap-4 sm:grid-cols-2">
        {prototypeGuide.map((item) => (
          <div key={item.title} className="rounded-2xl border border-border/80 bg-card/50 p-5">
            <p className="font-display text-lg">{item.title}</p>
            <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">{item.body}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="button"
          onClick={() => {
            enterDemo()
            navigate('/morning')
          }}
          className="group inline-flex h-16 items-center justify-center gap-3 rounded-2xl bg-urgent px-8 font-display text-xl font-semibold text-urgent-foreground shadow-[var(--shadow-urgent)] transition-transform hover:-translate-y-0.5"
        >
          Enter Joe&apos;s day
          <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
        </button>
        <button
          type="button"
          onClick={() => {
            update({ seenLanding: true, onboarded: false, dayStarted: false })
            navigate('/onboarding')
          }}
          className="inline-flex h-16 items-center justify-center rounded-2xl border border-input px-7 font-display text-lg text-ink-soft transition-colors hover:bg-secondary/70"
        >
          Teach me my job first
        </button>
      </div>

      <p className="mt-8 text-sm text-muted-foreground">
        ~8 minutes for the full loop. Use the prototype bar at the bottom to simulate a Slack
        interrupt or reset.
      </p>
    </Page>
  )
}
