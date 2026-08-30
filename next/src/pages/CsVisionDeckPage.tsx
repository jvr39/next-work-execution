import { useCallback, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'
import { Brand } from '@/components/Chrome'
import { csVisionSlides, type VisionSlide } from '@/lib/cs-vision-deck'
import { useNext } from '@/lib/next-store'
import { cn } from '@/lib/utils'

function MockShell({
  children,
  label = 'Next · live workspace',
}: {
  children: React.ReactNode
  label?: string
}) {
  return (
    <div className="relative w-full overflow-hidden rounded-[1.35rem] border border-white/12 bg-[#0c1218]/92 shadow-[0_40px_100px_-40px_rgba(0,0,0,0.75)]">
      <div className="flex items-center gap-2 border-b border-white/8 px-4 py-3">
        <span className="size-2 rounded-full bg-[#ff5f57]" />
        <span className="size-2 rounded-full bg-[#febc2e]" />
        <span className="size-2 rounded-full bg-[#28c840]" />
        <span className="ml-3 text-[11px] tracking-[0.18em] text-white/35 uppercase">{label}</span>
      </div>
      <div className="relative min-h-[280px] p-5 sm:min-h-[320px] sm:p-7">{children}</div>
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            'radial-gradient(80% 60% at 80% 0%, rgba(94, 214, 198, 0.14), transparent 55%)',
        }}
      />
    </div>
  )
}

function MockTitle() {
  return (
    <MockShell label="Next for CS">
      <p className="text-[11px] tracking-[0.22em] text-teal-300/80 uppercase">Vision mock</p>
      <p className="font-display mt-4 text-4xl leading-[0.95] text-white sm:text-5xl">
        See next.
        <br />
        Do it.
        <br />
        Done.
      </p>
      <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/55">
        Not a dashboard. A route through the day — connected to CRM, Slack, Gong, calendar, and
        Support.
      </p>
      <div className="mt-8 flex flex-wrap gap-2">
        {['Calendar', 'Email', 'Slack', 'CRM', 'Health', 'Gong', 'Support'].map((t) => (
          <span
            key={t}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-white/70"
          >
            {t}
          </span>
        ))}
      </div>
    </MockShell>
  )
}

function MockBriefing() {
  return (
    <MockShell>
      <p className="text-white/45 text-[12px]">Good morning, Joe.</p>
      <p className="font-display mt-3 text-2xl text-white sm:text-3xl">
        Acme&apos;s renewal is now at risk.
      </p>
      <p className="mt-6 text-sm text-white/50">Next</p>
      <p className="font-display mt-1 text-xl text-teal-200">Review Acme renewal risk</p>
      <p className="mt-2 text-sm text-white/40">20 min · evidence already pulled</p>
      <div className="mt-8">
        <span className="inline-flex items-center rounded-2xl bg-teal-400 px-8 py-3 font-display text-lg font-semibold text-[#062018]">
          Start
        </span>
      </div>
    </MockShell>
  )
}

function MockRisk() {
  return (
    <MockShell>
      <p className="text-[11px] tracking-[0.2em] text-rose-300/90 uppercase">You do this</p>
      <p className="font-display mt-2 text-2xl text-white">Review Acme renewal risk</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {[
          ['Health', 'Red'],
          ['ARR', '$420K'],
          ['Usage', '−22%'],
        ].map(([k, v]) => (
          <span
            key={k}
            className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-white/75"
          >
            {k}: <strong className="text-white">{v}</strong>
          </span>
        ))}
      </div>
      <div className="mt-5 rounded-xl border border-white/10 bg-black/25 p-4">
        <p className="text-[11px] text-white/40">Gong · yesterday</p>
        <p className="mt-1 text-sm leading-relaxed text-white/80 italic">
          “We&apos;re being asked to look at alternatives before we commit for another year.”
        </p>
      </div>
      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        {['Escalate to exec sponsor', 'Ask CSM for more info'].map((opt, i) => (
          <button
            key={opt}
            type="button"
            className={cn(
              'rounded-xl border px-3 py-3 text-left text-sm text-white/85',
              i === 0 ? 'border-teal-400/40 bg-teal-400/10' : 'border-white/10 bg-white/4',
            )}
          >
            {opt}
          </button>
        ))}
      </div>
    </MockShell>
  )
}

function MockApprove() {
  return (
    <MockShell>
      <p className="text-[11px] tracking-[0.2em] text-teal-300/90 uppercase">
        AI prepared · awaiting approval
      </p>
      <p className="font-display mt-2 text-2xl text-white">Globex QBR follow-up</p>
      <div className="mt-5 rounded-xl bg-white/[0.04] p-4 font-mono text-[12px] leading-relaxed text-white/70">
        Thanks again for today — attaching the two commitments we discussed. Reporting fix targeted
        for <span className="text-teal-200">Sept 18</span>. Reply if that date needs to move…
      </div>
      <div className="mt-5 flex gap-2">
        <span className="inline-flex items-center gap-2 rounded-full bg-teal-400 px-4 py-2 text-sm font-medium text-[#062018]">
          <Check className="size-4" /> Approve & send
        </span>
        <span className="rounded-full border border-white/15 px-4 py-2 text-sm text-white/55">
          Edit
        </span>
      </div>
    </MockShell>
  )
}

function MockInterrupt() {
  return (
    <MockShell label="Slack · #acme-deal">
      <p className="text-[11px] text-white/40">Sarah Delgado · just now</p>
      <p className="mt-3 text-lg leading-snug text-white">
        New: James forwarded a thread — Competitor X bake-off Friday. Need a one-page save plan for
        Jamie before forecast.
      </p>
      <div className="mt-6 rounded-xl border border-amber-300/25 bg-amber-300/10 p-4">
        <p className="text-[11px] tracking-wider text-amber-100/80 uppercase">Replan?</p>
        <p className="mt-1 text-sm text-white/85">
          Insert <strong className="text-white">Prep Acme exec save plan</strong> as Next. Keep
          11:30 forecast. Push lower work later.
        </p>
        <div className="mt-4 flex gap-2">
          <span className="rounded-full bg-white px-4 py-2 text-sm font-medium text-[#0c1218]">
            Accept route
          </span>
          <span className="rounded-full border border-white/15 px-4 py-2 text-sm text-white/55">
            Keep plan
          </span>
        </div>
      </div>
    </MockShell>
  )
}

function MockMeeting() {
  return (
    <MockShell>
      <p className="text-[11px] text-white/40">Starts in 4 min</p>
      <p className="font-display mt-2 text-2xl text-white">Team forecast review</p>
      <ul className="mt-5 space-y-2 text-sm text-white/75">
        <li className="rounded-lg bg-white/5 px-3 py-2">1. Acme — exec path this week</li>
        <li className="rounded-lg bg-white/5 px-3 py-2">2. Globex — commitment date locked</li>
        <li className="rounded-lg bg-white/5 px-3 py-2">3. Mid-market rollup · deltas ready</li>
      </ul>
      <p className="mt-4 text-xs text-teal-200/80">You run the meeting. Next brought the packet.</p>
    </MockShell>
  )
}

function MockEnough() {
  return (
    <MockShell>
      <p className="text-[11px] tracking-[0.2em] text-teal-300/80 uppercase">Day status</p>
      <p className="font-display mt-3 text-3xl text-white">Enough for today.</p>
      <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/60">
        Urgent revenue, approvals, forecast, and coaching are clear. Globex adoption dig is parked
        for tomorrow morning.
      </p>
      <div className="mt-6 h-2 overflow-hidden rounded-full bg-white/10">
        <div className="h-full w-[82%] rounded-full bg-teal-400" />
      </div>
      <p className="mt-2 text-[11px] text-white/40">On track · not inbox zero</p>
    </MockShell>
  )
}

function MockConnect() {
  return (
    <MockShell label="Single source of truth">
      <div className="grid gap-3 sm:grid-cols-2">
        {[
          ['Calendar', 'Hard stops protected'],
          ['Support', 'See tickets · intervene when needed'],
          ['CRM / Health', 'Risk before inbox'],
          ['Gong + Slack', 'Evidence on every Next'],
        ].map(([t, d]) => (
          <div key={t} className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-4">
            <p className="font-display text-lg text-white">{t}</p>
            <p className="mt-1 text-xs text-white/45">{d}</p>
          </div>
        ))}
      </div>
      <p className="mt-6 text-sm text-white/55">
        Dummy site · illustrates the vision. Try the live day for the real loop.
      </p>
    </MockShell>
  )
}

function MockFor({ slide }: { slide: VisionSlide }) {
  switch (slide.mock) {
    case 'title':
      return <MockTitle />
    case 'briefing':
      return <MockBriefing />
    case 'risk':
      return <MockRisk />
    case 'approve':
      return <MockApprove />
    case 'interrupt':
      return <MockInterrupt />
    case 'meeting':
      return <MockMeeting />
    case 'enough':
      return <MockEnough />
    case 'connect':
      return <MockConnect />
  }
}

export function CsVisionDeckPage() {
  const [index, setIndex] = useState(0)
  const slide = csVisionSlides[index]
  const navigate = useNavigate()
  const { enterDemo } = useNext()
  const last = index === csVisionSlides.length - 1

  const go = useCallback(
    (dir: -1 | 1) => {
      setIndex((i) => Math.min(csVisionSlides.length - 1, Math.max(0, i + dir)))
    },
    [],
  )

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault()
        go(1)
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        go(-1)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [go])

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#070b10] text-white">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(90% 70% at 10% -10%, rgba(94, 214, 198, 0.18), transparent 50%),
            radial-gradient(70% 50% at 100% 20%, rgba(56, 120, 255, 0.12), transparent 45%),
            linear-gradient(180deg, #070b10 0%, #0d1520 55%, #081018 100%)
          `,
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            'radial-gradient(rgba(255,255,255,0.06) 0.6px, transparent 0.6px)',
          backgroundSize: '3px 3px',
        }}
      />

      <header className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between px-6 pt-6">
        <Brand link={false} className="!text-white" />
        <div className="flex items-center gap-4 text-xs text-white/45">
          <span className="hidden sm:inline">Vision deck · dummy mockup</span>
          <Link to="/" className="transition-colors hover:text-white">
            Exit
          </Link>
        </div>
      </header>

      <main className="relative z-10 mx-auto grid w-full max-w-6xl gap-10 px-6 pt-10 pb-28 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-14 lg:pt-16">
        <div key={slide.id} className="animate-rise">
          <p className="text-eyebrow !text-teal-300/70">{slide.chapter}</p>
          <h1 className="font-display mt-4 text-[clamp(2rem,4.5vw,3.35rem)] leading-[1.05] tracking-tight text-white">
            {slide.title}
          </h1>
          <p className="mt-5 max-w-md text-[16px] leading-relaxed text-white/60">{slide.line}</p>
          {slide.note ? (
            <p className="mt-4 max-w-md border-l-2 border-teal-400/40 pl-4 text-sm text-white/45">
              {slide.note}
            </p>
          ) : null}

          <div className="mt-10 flex flex-wrap items-center gap-3">
            {slide.id === 'open' ? (
              <button
                type="button"
                onClick={() => {
                  enterDemo()
                  navigate('/home')
                }}
                className="inline-flex h-12 items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 text-sm text-white/90 transition hover:bg-white/10"
              >
                Try the live day
              </button>
            ) : (
              <button
                type="button"
                onClick={() => go(-1)}
                disabled={index === 0}
                className="inline-flex h-12 items-center gap-2 rounded-full border border-white/15 px-5 text-sm text-white/70 transition enabled:hover:bg-white/5 disabled:opacity-30"
              >
                <ArrowLeft className="size-4" /> Back
              </button>
            )}
            {!last ? (
              <button
                type="button"
                onClick={() => go(1)}
                className="inline-flex h-12 items-center gap-2 rounded-full bg-teal-300 px-6 text-sm font-semibold text-[#062018] shadow-[0_16px_40px_-16px_rgba(94,214,198,0.8)] transition hover:-translate-y-0.5"
              >
                Next beat <ArrowRight className="size-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  enterDemo()
                  navigate('/home')
                }}
                className="inline-flex h-12 items-center gap-2 rounded-full bg-teal-300 px-6 text-sm font-semibold text-[#062018] shadow-[0_16px_40px_-16px_rgba(94,214,198,0.8)] transition hover:-translate-y-0.5"
              >
                Enter Joe&apos;s live day <ArrowRight className="size-4" />
              </button>
            )}
            {slide.id === 'open' ? (
              <button
                type="button"
                onClick={() => go(1)}
                className="inline-flex h-12 items-center gap-2 rounded-full bg-teal-300 px-6 text-sm font-semibold text-[#062018] shadow-[0_16px_40px_-16px_rgba(94,214,198,0.8)] transition hover:-translate-y-0.5"
              >
                Walk the story <ArrowRight className="size-4" />
              </button>
            ) : null}
          </div>
        </div>

        <div key={`${slide.id}-mock`} className="animate-morph">
          <MockFor slide={slide} />
        </div>
      </main>

      <footer className="fixed inset-x-0 bottom-0 z-20 border-t border-white/8 bg-[#070b10]/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
          <div className="flex flex-1 items-center gap-1.5 overflow-x-auto">
            {csVisionSlides.map((s, i) => (
              <button
                key={s.id}
                type="button"
                aria-label={`Go to ${s.chapter}`}
                onClick={() => setIndex(i)}
                className={cn(
                  'h-1.5 min-w-6 flex-1 rounded-full transition-all',
                  i === index ? 'bg-teal-300' : i < index ? 'bg-white/35' : 'bg-white/12',
                )}
              />
            ))}
          </div>
          <p className="shrink-0 text-[11px] tracking-wider text-white/35 tabular-nums">
            {index + 1} / {csVisionSlides.length}
          </p>
        </div>
      </footer>
    </div>
  )
}
