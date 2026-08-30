import { useCallback, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Brand } from '@/components/Chrome'
import { WaitlistForm } from '@/components/WaitlistForm'
import { vcPitchSlides, type PitchSlide } from '@/lib/vc-pitch-deck'
import { useNext } from '@/lib/next-store'
import { cn } from '@/lib/utils'

function SlideBody({ slide }: { slide: PitchSlide }) {
  if (slide.layout === 'title') {
    return (
      <div className="flex min-h-[52vh] flex-col justify-end pb-4">
        <Brand link={false} size="hero" className="!text-white" />
        <h1 className="font-display mt-10 max-w-3xl text-[clamp(2.2rem,5vw,3.75rem)] leading-[1.05] tracking-tight text-white">
          {slide.title}
        </h1>
        {slide.body ? (
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70">{slide.body}</p>
        ) : null}
      </div>
    )
  }

  if (slide.layout === 'waitlist') {
    return (
      <div className="flex min-h-[52vh] flex-col justify-center">
        <p className="text-eyebrow !text-teal-300/80">{slide.section}</p>
        <h1 className="font-display mt-4 max-w-3xl text-[clamp(2rem,4.5vw,3.2rem)] leading-[1.06] text-white">
          {slide.title}
        </h1>
        {slide.body ? (
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/65">{slide.body}</p>
        ) : null}
        <div className="mt-10">
          <WaitlistForm dark />
        </div>
      </div>
    )
  }

  if (slide.layout === 'quote') {
    return (
      <div className="flex min-h-[52vh] flex-col justify-center">
        <p className="text-eyebrow !text-teal-300/70">{slide.section}</p>
        <h1 className="font-display mt-6 max-w-3xl text-[clamp(2rem,4.2vw,3.2rem)] leading-[1.08] text-white">
          {slide.title}
        </h1>
        {slide.body ? (
          <p className="mt-8 max-w-2xl border-l-2 border-teal-400/50 pl-5 text-lg leading-relaxed text-white/65">
            {slide.body}
          </p>
        ) : null}
      </div>
    )
  }

  if (slide.layout === 'grid' && slide.cells) {
    return (
      <div>
        <p className="text-eyebrow !text-teal-300/70">{slide.section}</p>
        <h1 className="font-display mt-4 max-w-3xl text-[clamp(1.9rem,4vw,3rem)] leading-[1.08] text-white">
          {slide.title}
        </h1>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {slide.cells.map((c) => (
            <div
              key={c.label}
              className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-5"
            >
              <p className="text-[11px] tracking-[0.2em] text-white/40 uppercase">{c.label}</p>
              <p className="mt-2 font-display text-xl leading-snug text-white">{c.value}</p>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (slide.layout === 'compare') {
    return (
      <div>
        <p className="text-eyebrow !text-teal-300/70">{slide.section}</p>
        <h1 className="font-display mt-4 max-w-3xl text-[clamp(1.9rem,4vw,3rem)] leading-[1.08] text-white">
          {slide.title}
        </h1>
        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <p className="text-[11px] tracking-[0.2em] text-white/35 uppercase">Incumbents</p>
            <p className="mt-3 text-base leading-relaxed text-white/70">{slide.left}</p>
            <p className="mt-4 text-sm text-white/45">{slide.right}</p>
          </div>
          <div className="rounded-2xl border border-teal-400/30 bg-teal-400/10 p-6">
            <p className="text-[11px] tracking-[0.2em] text-teal-200/80 uppercase">Next</p>
            <p className="mt-3 text-base leading-relaxed text-white/85">{slide.body}</p>
          </div>
        </div>
      </div>
    )
  }

  if (slide.layout === 'close') {
    return (
      <div className="flex min-h-[52vh] flex-col justify-center">
        <p className="text-eyebrow !text-teal-300/70">{slide.section}</p>
        <h1 className="font-display mt-4 max-w-3xl text-[clamp(2rem,4.5vw,3.4rem)] leading-[1.06] text-white">
          {slide.title}
        </h1>
        {slide.bullets ? (
          <ul className="mt-8 max-w-2xl space-y-3">
            {slide.bullets.map((b) => (
              <li key={b} className="flex gap-3 text-base leading-relaxed text-white/70">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-teal-300" />
                {b}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    )
  }

  // split default
  return (
    <div>
      <p className="text-eyebrow !text-teal-300/70">{slide.section}</p>
      <h1 className="font-display mt-4 max-w-3xl text-[clamp(1.9rem,4vw,3rem)] leading-[1.08] text-white">
        {slide.title}
      </h1>
      {slide.body ? (
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/70">{slide.body}</p>
      ) : null}
      {slide.bullets ? (
        <ul className="mt-8 max-w-2xl space-y-3">
          {slide.bullets.map((b) => (
            <li key={b} className="flex gap-3 text-base leading-relaxed text-white/70">
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-teal-300" />
              {b}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}

export function VcPitchDeckPage() {
  const [index, setIndex] = useState(0)
  const slide = vcPitchSlides[index]
  const navigate = useNavigate()
  const { enterDemo } = useNext()
  const last = index === vcPitchSlides.length - 1

  const go = useCallback((dir: -1 | 1) => {
    setIndex((i) => Math.min(vcPitchSlides.length - 1, Math.max(0, i + dir)))
  }, [])

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
            radial-gradient(80% 60% at 0% 0%, rgba(94, 214, 198, 0.16), transparent 50%),
            radial-gradient(60% 40% at 100% 10%, rgba(56, 120, 255, 0.1), transparent 45%),
            linear-gradient(180deg, #070b10 0%, #0c141c 100%)
          `,
        }}
      />

      <header className="relative z-10 mx-auto flex w-full max-w-5xl items-center justify-between px-6 pt-6">
        <p className="text-[11px] tracking-[0.22em] text-white/35 uppercase">
          Pre-seed deck · {slide.section}
        </p>
        <div className="flex items-center gap-4 text-xs text-white/45">
          <Link to="/vision" className="hover:text-white">
            Product vision
          </Link>
          <Link to="/" className="hover:text-white">
            Exit
          </Link>
        </div>
      </header>

      <main className="relative z-10 mx-auto w-full max-w-5xl px-6 pt-12 pb-28">
        <div key={slide.id} className="animate-rise">
          <SlideBody slide={slide} />
          {slide.footer ? (
            <p className="mt-12 text-[12px] tracking-wide text-white/30">{slide.footer}</p>
          ) : null}
        </div>

        <div className="mt-14 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => go(-1)}
            disabled={index === 0}
            className="inline-flex h-11 items-center gap-2 rounded-full border border-white/15 px-5 text-sm text-white/70 enabled:hover:bg-white/5 disabled:opacity-30"
          >
            <ArrowLeft className="size-4" /> Back
          </button>
          {!last ? (
            <button
              type="button"
              onClick={() => go(1)}
              className="inline-flex h-11 items-center gap-2 rounded-full bg-teal-300 px-6 text-sm font-semibold text-[#062018]"
            >
              Next <ArrowRight className="size-4" />
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={() => {
                  enterDemo()
                  navigate('/home')
                }}
                className="inline-flex h-11 items-center gap-2 rounded-full bg-teal-300 px-6 text-sm font-semibold text-[#062018]"
              >
                Show live demo <ArrowRight className="size-4" />
              </button>
              <button
                type="button"
                onClick={() => navigate('/vision')}
                className="inline-flex h-11 items-center gap-2 rounded-full border border-white/20 px-5 text-sm text-white/80"
              >
                Product vision deck
              </button>
            </>
          )}
        </div>
      </main>

      <footer className="fixed inset-x-0 bottom-0 z-20 border-t border-white/8 bg-[#070b10]/9 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center gap-3 px-6 py-3">
          <div className="flex flex-1 gap-1">
            {vcPitchSlides.map((s, i) => (
              <button
                key={s.id}
                type="button"
                aria-label={s.section}
                onClick={() => setIndex(i)}
                className={cn(
                  'h-1 flex-1 rounded-full',
                  i === index ? 'bg-teal-300' : i < index ? 'bg-white/35' : 'bg-white/12',
                )}
              />
            ))}
          </div>
          <span className="text-[11px] text-white/35 tabular-nums">
            {index + 1}/{vcPitchSlides.length}
          </span>
        </div>
      </footer>
    </div>
  )
}
