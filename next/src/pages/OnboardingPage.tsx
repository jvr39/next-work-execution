import { useState, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Check } from 'lucide-react'
import { Brand, Page, TopBar } from '@/components/Chrome'
import { accountabilityOptions, meetingOptions, roleModel } from '@/lib/next-data'
import { useNext } from '@/lib/next-store'
import { cn } from '@/lib/utils'

const steps = ['Accountability', 'Measurement', 'People', 'Rhythm', 'Model'] as const

export function OnboardingPage() {
  const navigate = useNavigate()
  const { update } = useNext()
  const [step, setStep] = useState(0)
  const [picked, setPicked] = useState([
    'Manage CSMs',
    'Forecast renewals',
    'Escalate customer risk',
  ])
  const [custom, setCustom] = useState('')
  const [measured, setMeasured] = useState(
    'Net revenue retention, forecast accuracy, and team attrition.',
  )
  const [manager, setManager] = useState('Jamie Okafor, VP Customer Success')
  const [reports, setReports] = useState('6 CSMs — Alex, Priya, Dana, Miguel, Tess, Ken')
  const [meetings, setMeetings] = useState([
    'Wednesday forecast review',
    'Weekly 1:1s with each CSM',
    'Customer QBRs',
  ])
  const [weights, setWeights] = useState(roleModel.weights)

  const toggle = (list: string[], setList: (v: string[]) => void, value: string) =>
    setList(list.includes(value) ? list.filter((v) => v !== value) : [...list, value])

  const total = weights.reduce((sum, w) => sum + w.value, 0)

  return (
    <>
      <TopBar
        right={
          <button
            type="button"
            onClick={() => {
              update({ seenLanding: true, onboarded: true, dayStarted: false })
              navigate('/morning')
            }}
            className="transition-colors hover:text-foreground"
          >
            Skip · use Joe&apos;s model
          </button>
        }
      />
      <Page>
        <div className="pt-8">
          {step === 0 && <Brand size="hero" link={false} />}
          <p className={cn('text-eyebrow', step === 0 ? 'mt-8' : 'mt-2')}>
            Teach me my job · Step {Math.min(step + 1, steps.length)} of {steps.length}
          </p>
        </div>

        <div key={step} className="animate-rise mt-6">
          {step === 0 && (
            <Question
              title="What are you accountable for?"
              subtitle="Pick the outcomes that are genuinely yours. I'll infer the rest from your calendar and CRM."
            >
              <div className="flex flex-wrap gap-2">
                {accountabilityOptions.map((option) => (
                  <Chip
                    key={option}
                    active={picked.includes(option)}
                    onClick={() => toggle(picked, setPicked, option)}
                  >
                    {option}
                  </Chip>
                ))}
              </div>
              <input
                value={custom}
                onChange={(e) => setCustom(e.target.value)}
                placeholder="Something else you own…"
                className="mt-5 w-full rounded-xl border border-input bg-card px-4 py-3 text-[15px] outline-none placeholder:text-muted-foreground focus:border-urgent"
              />
            </Question>
          )}

          {step === 1 && (
            <Question
              title="How are you measured?"
              subtitle="In your own words. This decides what I push to the top of your day."
            >
              <textarea
                value={measured}
                onChange={(e) => setMeasured(e.target.value)}
                rows={4}
                className="w-full rounded-xl border border-input bg-card px-4 py-3 text-[15px] leading-relaxed outline-none focus:border-urgent"
              />
              <div className="mt-4 flex flex-wrap gap-2">
                {roleModel.measuredBy.map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() =>
                      setMeasured((prev) => (prev.includes(m) ? prev : `${prev} ${m}.`))
                    }
                    className="rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
                  >
                    + {m}
                  </button>
                ))}
              </div>
            </Question>
          )}

          {step === 2 && (
            <Question
              title="Who do you report to? Who reports to you?"
              subtitle="I use this to know whose questions can't wait and whose growth you own."
            >
              <Field label="You report to" value={manager} onChange={setManager} />
              <Field label="Reports to you" value={reports} onChange={setReports} />
            </Question>
          )}

          {step === 3 && (
            <Question
              title="What meetings matter? What happens every week?"
              subtitle="Recurring commitments become the skeleton of every day I plan."
            >
              <div className="flex flex-wrap gap-2">
                {meetingOptions.map((option) => (
                  <Chip
                    key={option}
                    active={meetings.includes(option)}
                    onClick={() => toggle(meetings, setMeetings, option)}
                  >
                    {option}
                  </Chip>
                ))}
              </div>
            </Question>
          )}

          {step === 4 && (
            <div>
              <h1 className="font-display text-[clamp(1.75rem,4.5vw,2.6rem)] font-semibold leading-tight tracking-tight">
                Based on the past 90 days, here&apos;s my understanding of your job.
              </h1>
              <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
                {roleModel.title} · reporting to {manager.split(',')[0]}. Correct anything
                that&apos;s off — I&apos;ll re-weight what I surface first.
              </p>

              <div className="mt-8 space-y-4">
                {weights.map((w, i) => (
                  <div key={w.label}>
                    <div className="flex items-baseline justify-between text-[15px]">
                      <span>{w.label}</span>
                      <span className="font-display text-sm text-ink-soft">{w.value}%</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={50}
                      value={w.value}
                      onChange={(e) =>
                        setWeights((prev) =>
                          prev.map((item, idx) =>
                            idx === i ? { ...item, value: Number(e.target.value) } : item,
                          ),
                        )
                      }
                      className="mt-2 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-secondary accent-[var(--urgent)]"
                    />
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                Total {total}% {total !== 100 && "— I'll normalise this for you."}
              </p>

              <div className="mt-8">
                <p className="text-eyebrow">Recurring work this implies</p>
                <ul className="mt-3 divide-y divide-border">
                  {roleModel.outcomes.map((o) => (
                    <li key={o.outcome} className="py-3">
                      <p className="text-[15px]">{o.outcome}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{o.recurring}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        <div className="mt-10 flex items-center gap-4">
          {step > 0 && (
            <button
              type="button"
              onClick={() => setStep((s) => s - 1)}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Back
            </button>
          )}
          {step < 4 ? (
            <button
              type="button"
              onClick={() => setStep((s) => s + 1)}
              className="group inline-flex h-14 items-center gap-3 rounded-2xl bg-primary px-8 font-display text-lg font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
            >
              Continue
              <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                update({ seenLanding: true, onboarded: true, dayStarted: false })
                navigate('/morning')
              }}
              className="group inline-flex h-16 items-center gap-3 rounded-2xl bg-urgent px-9 font-display text-xl font-semibold text-urgent-foreground shadow-[var(--shadow-urgent)] transition-transform hover:-translate-y-0.5"
            >
              <Check className="size-5" />
              Looks right — build my model
            </button>
          )}
        </div>
      </Page>
    </>
  )
}

function Question({
  title,
  subtitle,
  children,
}: {
  title: string
  subtitle: string
  children: ReactNode
}) {
  return (
    <div>
      <h1 className="font-display text-[clamp(1.75rem,4.5vw,2.6rem)] font-semibold leading-tight tracking-tight">
        {title}
      </h1>
      <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-ink-soft">{subtitle}</p>
      <div className="mt-7">{children}</div>
    </div>
  )
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'rounded-full border px-4 py-2 text-[14px] transition-all duration-200',
        active
          ? 'border-urgent bg-urgent/15 text-urgent-foreground'
          : 'border-border bg-card text-ink-soft hover:border-input',
      )}
    >
      {children}
    </button>
  )
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string
  value: string
  onChange: (v: string) => void
}) {
  return (
    <label className="mb-4 block">
      <span className="text-eyebrow">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-xl border border-input bg-card px-4 py-3 text-[15px] outline-none focus:border-urgent"
      />
    </label>
  )
}
