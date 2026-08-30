import { Link } from 'react-router-dom'
import { InspectLinks, Page, TopBar } from '@/components/Chrome'
import { useNext } from '@/lib/next-store'

export function MemoryPage() {
  const { state, progress } = useNext()
  const decisions = Object.entries(state.decisions)

  return (
    <>
      <TopBar right={<InspectLinks />} />
      <Page>
        <div className="animate-rise pt-8">
          <p className="text-eyebrow">This session</p>
          <h1 className="font-display mt-3 text-[clamp(1.9rem,4.5vw,2.8rem)] font-semibold leading-tight tracking-tight">
            Decisions you made today.
          </h1>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-ink-soft">
            Traces from this clickthrough. Nothing learns yet.
          </p>
        </div>

        <section className="mt-12">
          {decisions.length === 0 ? (
            <p className="mt-3 text-[15px] text-muted-foreground">
              No decisions yet · {progress.done}/{progress.total} actions complete. Finish a task to
              leave a trace.
            </p>
          ) : (
            <ul className="mt-3 divide-y divide-border">
              {decisions.map(([actionId, decisionId]) => (
                <li key={actionId} className="py-3 text-[15px]">
                  <span className="text-muted-foreground">{actionId}</span>
                  <span className="mx-2 text-urgent-foreground">→</span>
                  <span>{decisionId}</span>
                </li>
              ))}
            </ul>
          )}
          {state.replanApplied && (
            <p className="mt-4 text-sm text-urgent-foreground">
              Mid-day replan accepted.
            </p>
          )}
        </section>

        <Link
          to="/home"
          className="mt-12 inline-flex text-urgent-foreground underline-offset-4 hover:underline"
        >
          Back to Now
        </Link>
      </Page>
    </>
  )
}
