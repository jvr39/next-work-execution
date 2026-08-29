import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  ArrowRight,
  BarChart3,
  Check,
  FileText,
  Mail,
  MessageSquare,
  Play,
  X,
} from 'lucide-react'
import { LevelLabel, NavLinks, Page, TopBar } from '@/components/Chrome'
import { actionsById, type Evidence } from '@/lib/next-data'
import { useNext } from '@/lib/next-store'
import { cn } from '@/lib/utils'

const icons: Record<Evidence['kind'], typeof Play> = {
  gong: Play,
  slack: MessageSquare,
  note: FileText,
  chart: BarChart3,
  email: Mail,
}

export function TaskPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { current, upcoming, completeAction } = useNext()
  const action = id ? actionsById[id] : undefined
  const [chosen, setChosen] = useState<string | null>(null)
  const [sent, setSent] = useState(false)
  const [briefOpen, setBriefOpen] = useState(true)

  useEffect(() => {
    setChosen(null)
    setSent(false)
    setBriefOpen(true)
  }, [id])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return
      if (e.key === 'd' || e.key === 'D') {
        if (!action) return
        completeAction(action.id, chosen ?? undefined)
        navigate('/home')
      }
      if (e.key === 'Escape') navigate('/home')
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [action, chosen, completeAction, navigate])

  if (!action) {
    return (
      <Page className="pt-16">
        <p className="font-display text-2xl">That action isn&apos;t in today&apos;s queue.</p>
        <button
          type="button"
          onClick={() => navigate('/home')}
          className="mt-6 text-urgent-foreground underline-offset-4 hover:underline"
        >
          Back to Now
        </button>
      </Page>
    )
  }

  const option = action.workspace.options.find((o) => o.id === chosen) ?? null
  const nextUp = upcoming[0] ?? (current?.id !== action.id ? current : null)

  return (
    <>
      <TopBar
        right={
          <>
            <NavLinks />
            <button
              type="button"
              onClick={() => navigate('/home')}
              className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
            >
              <X className="size-3.5" /> Close
            </button>
          </>
        }
      />
      <Page className="animate-morph">
        <div className="pt-6">
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-eyebrow">Workspace · {action.window}</span>
            <LevelLabel level={action.level} />
          </div>
          <h1 className="font-display mt-4 text-[clamp(1.8rem,4.6vw,2.75rem)] font-semibold leading-tight tracking-tight">
            {action.title}
          </h1>
          <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-ink-soft">
            <span className="text-eyebrow mr-2 align-middle">Objective</span>
            {action.workspace.objective}
          </p>
        </div>

        <div className="hairline mt-8 flex flex-wrap gap-x-8 gap-y-3 pt-5">
          {action.workspace.context.map((c) => (
            <div key={c.label}>
              <p className="text-eyebrow">{c.label}</p>
              <p className={cn('font-display mt-1 text-lg', c.urgent && 'text-urgent-foreground')}>
                {c.value}
              </p>
            </div>
          ))}
        </div>

        {action.brief && (
          <section className="mt-10">
            <button
              type="button"
              onClick={() => setBriefOpen((v) => !v)}
              className="text-eyebrow transition-colors hover:text-foreground"
            >
              Account brief {briefOpen ? '−' : '+'}
            </button>
            {briefOpen && (
              <p className="animate-rise mt-3 max-w-2xl text-[15px] leading-relaxed text-ink-soft">
                {action.brief}
              </p>
            )}
          </section>
        )}

        <section className="mt-12">
          <p className="text-eyebrow">What changed</p>
          <ul className="mt-3 space-y-2.5">
            {action.workspace.changed.map((c) => (
              <li key={c} className="flex gap-3 text-[15px] leading-relaxed text-ink-soft">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-urgent" />
                {c}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-12">
          <p className="text-eyebrow">Relevant evidence</p>
          <ul className="mt-3 divide-y divide-border">
            {action.workspace.evidence.map((e) => {
              const Icon = icons[e.kind]
              return (
                <li key={e.label} className="group flex cursor-default items-start gap-4 py-4">
                  <Icon className="mt-0.5 size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-urgent-foreground" />
                  <div>
                    <p className="text-[14px] text-foreground">{e.label}</p>
                    <p className="mt-1 text-[14px] leading-relaxed text-muted-foreground">
                      {e.detail}
                    </p>
                  </div>
                </li>
              )
            })}
          </ul>
        </section>

        <section className="mt-14">
          <p className="text-eyebrow">Your action — choose one</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {action.workspace.options.map((o) => (
              <button
                key={o.id}
                type="button"
                onClick={() => {
                  setChosen(o.id)
                  setSent(false)
                }}
                className={cn(
                  'surface rounded-2xl p-5 text-left transition-all duration-200 hover:-translate-y-0.5',
                  chosen === o.id && 'border-urgent ring-1 ring-urgent',
                )}
              >
                <p className="font-display text-lg">{o.label}</p>
                <p className="mt-1.5 text-[14px] leading-relaxed text-muted-foreground">{o.hint}</p>
              </button>
            ))}
          </div>
        </section>

        {option?.prepared && (
          <section className="animate-rise mt-8">
            <div className="surface rounded-2xl p-6">
              <LevelLabel level="ai-prepared" />
              <p className="font-display mt-4 text-xl">{option.prepared.title}</p>
              <p className="mt-1 text-[13px] text-muted-foreground">{option.prepared.channel}</p>
              <p className="mt-5 whitespace-pre-line rounded-xl bg-secondary/60 p-5 text-[15px] leading-relaxed text-ink-soft">
                {option.prepared.body}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {option.prepared.evidence.map((e) => (
                  <span
                    key={e}
                    className="rounded-full border border-border px-3 py-1 text-[12px] text-muted-foreground"
                  >
                    {e}
                  </span>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => setSent(true)}
                  disabled={sent}
                  className="inline-flex h-12 items-center gap-2 rounded-xl bg-urgent px-6 font-display text-base font-semibold text-urgent-foreground shadow-[var(--shadow-urgent)] transition-transform hover:-translate-y-0.5 disabled:translate-y-0 disabled:opacity-70"
                >
                  <Check className="size-4" />
                  {sent ? 'Sent as you' : 'Approve & send'}
                </button>
                <span className="text-sm text-muted-foreground">Edit before sending (demo)</span>
              </div>
            </div>
          </section>
        )}

        {option && !option.prepared && (
          <p className="animate-rise mt-6 text-[15px] text-ink-soft">
            Noted — {option.hint} I&apos;ll track it and tell you if anything changes.
          </p>
        )}

        <div className="hairline mt-16 flex flex-col gap-4 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            {nextUp ? (
              <>
                Next up when you finish:{' '}
                <span className="text-foreground">{nextUp.title}</span>
              </>
            ) : (
              'This is the last critical item.'
            )}
            <span className="mt-1 block text-[12px]">Keyboard: D done · Esc close</span>
          </p>
          <button
            type="button"
            onClick={() => {
              completeAction(action.id, chosen ?? undefined)
              navigate('/home')
            }}
            className="group inline-flex h-16 items-center justify-center gap-3 rounded-2xl bg-primary px-10 font-display text-2xl font-semibold text-primary-foreground transition-transform duration-200 hover:-translate-y-0.5"
          >
            Done
            <ArrowRight className="size-6 transition-transform duration-200 group-hover:translate-x-1" />
          </button>
        </div>
      </Page>
    </>
  )
}
