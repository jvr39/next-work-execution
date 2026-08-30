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
import { InspectLinks, LevelLabel, Page, TopBar } from '@/components/Chrome'
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
  const [showEvidence, setShowEvidence] = useState(false)

  useEffect(() => {
    setChosen(action?.workspace.options[0]?.id ?? null)
    setSent(false)
    setShowEvidence(false)
  }, [id, action])

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
  const topFacts = action.workspace.context.slice(0, 3)
  const topChanges = action.workspace.changed.slice(0, 3)

  return (
    <>
      <TopBar
        right={
          <>
            <InspectLinks />
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
          <LevelLabel level={action.level} />
          <h1 className="font-display mt-4 text-[clamp(1.8rem,4.6vw,2.6rem)] font-semibold leading-tight tracking-tight">
            {action.title}
          </h1>
          <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-ink-soft">{action.why}</p>
        </div>

        {/* Decisive facts — top */}
        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          {topFacts.map((c) => (
            <div
              key={c.label}
              className="rounded-xl border border-border/80 bg-card/50 px-4 py-3"
            >
              <p className="text-eyebrow">{c.label}</p>
              <p
                className={cn(
                  'font-display mt-1 text-lg',
                  c.urgent && 'text-urgent-foreground',
                )}
              >
                {c.value}
              </p>
            </div>
          ))}
        </div>

        <ul className="mt-5 space-y-2">
          {topChanges.map((c) => (
            <li key={c} className="flex gap-3 text-[14px] leading-relaxed text-ink-soft">
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-urgent" />
              {c}
            </li>
          ))}
        </ul>

        {/* Decision first */}
        <section className="mt-10">
          <p className="text-eyebrow">Recommended — choose one</p>
          <div className="mt-4 grid gap-3">
            {action.workspace.options.map((o, i) => (
              <button
                key={o.id}
                type="button"
                onClick={() => {
                  setChosen(o.id)
                  setSent(false)
                }}
                className={cn(
                  'rounded-2xl border px-5 py-4 text-left transition-all duration-200',
                  chosen === o.id
                    ? 'border-urgent bg-urgent/10 ring-1 ring-urgent'
                    : 'border-border/80 bg-card/40 hover:border-border',
                  i === 0 && chosen === o.id && 'shadow-[var(--shadow-urgent)]',
                )}
              >
                <p className="font-display text-lg">
                  {i === 0 ? `${o.label}` : o.label}
                  {i === 0 ? (
                    <span className="ml-2 text-[11px] tracking-wide text-urgent-foreground uppercase">
                      Suggested
                    </span>
                  ) : null}
                </p>
                <p className="mt-1 text-[14px] text-muted-foreground">{o.hint}</p>
              </button>
            ))}
          </div>
        </section>

        {option?.prepared && (
          <section className="animate-rise mt-6">
            <div className="rounded-2xl border border-border/80 bg-card/60 p-5">
              <p className="font-display text-lg">{option.prepared.title}</p>
              <p className="mt-1 text-[12px] text-muted-foreground">{option.prepared.channel}</p>
              <p className="mt-4 whitespace-pre-line text-[14px] leading-relaxed text-ink-soft">
                {option.prepared.body}
              </p>
              <button
                type="button"
                onClick={() => setSent(true)}
                disabled={sent}
                className="mt-5 inline-flex h-11 items-center gap-2 rounded-xl bg-urgent px-5 font-display text-sm font-semibold text-urgent-foreground disabled:opacity-70"
              >
                <Check className="size-4" />
                {sent ? 'Sent as you' : 'Approve & send'}
              </button>
            </div>
          </section>
        )}

        {option && !option.prepared && (
          <p className="mt-5 text-[14px] text-ink-soft">Noted — {option.hint}</p>
        )}

        <button
          type="button"
          onClick={() => setShowEvidence((v) => !v)}
          className="mt-10 text-[12px] tracking-wide text-muted-foreground uppercase hover:text-foreground"
        >
          {showEvidence ? 'Hide evidence' : 'Show evidence & brief'}
        </button>

        {showEvidence && (
          <div className="animate-rise mt-4 space-y-6">
            {action.brief && (
              <p className="max-w-2xl text-[14px] leading-relaxed text-ink-soft">{action.brief}</p>
            )}
            <ul className="divide-y divide-border">
              {action.workspace.evidence.map((e) => {
                const Icon = icons[e.kind]
                return (
                  <li key={e.label} className="flex items-start gap-4 py-3">
                    <Icon className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                    <div>
                      <p className="text-[14px]">{e.label}</p>
                      <p className="mt-1 text-[13px] text-muted-foreground">{e.detail}</p>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        )}

        <div className="hairline mt-12 flex flex-col gap-4 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            {nextUp ? (
              <>
                After Done: <span className="text-foreground">{nextUp.title}</span>
              </>
            ) : (
              'Last critical item.'
            )}
          </p>
          <button
            type="button"
            onClick={() => {
              completeAction(action.id, chosen ?? undefined)
              navigate('/home')
            }}
            className="group inline-flex h-14 items-center justify-center gap-3 rounded-2xl bg-primary px-10 font-display text-xl font-semibold text-primary-foreground transition-transform duration-200 hover:-translate-y-0.5"
          >
            Done
            <ArrowRight className="size-5 transition-transform duration-200 group-hover:translate-x-1" />
          </button>
        </div>
      </Page>
    </>
  )
}
