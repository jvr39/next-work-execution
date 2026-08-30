import { Link } from 'react-router-dom'
import { InspectLinks, Page, TopBar } from '@/components/Chrome'
import { workMemory } from '@/lib/next-data'
import { useNext } from '@/lib/next-store'

export function MemoryPage() {
  const { state, progress } = useNext()
  const decisions = Object.entries(state.decisions)

  return (
    <>
      <TopBar right={<InspectLinks />} />
      <Page>
        <div className="animate-rise pt-8">
          <p className="text-eyebrow">Work memory</p>
          <h1 className="font-display mt-3 text-[clamp(1.9rem,4.5vw,2.8rem)] font-semibold leading-tight tracking-tight">
            What Next learns about Joe over time.
          </h1>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-ink-soft">
            How Next learns Joe&apos;s judgment over time — so priorities feel personal. Seeded
            memories below; your prototype decisions appear as they happen.
          </p>
        </div>

        <section className="mt-12">
          <p className="text-eyebrow">This session</p>
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
              Mid-day replan accepted — interrupt weighting now favors AE escalations on red
              accounts.
            </p>
          )}
        </section>

        <section className="mt-14">
          <p className="text-eyebrow">Persistent memory (seeded)</p>
          <ul className="mt-4 space-y-4">
            {workMemory.map((m) => (
              <li key={m.title} className="rounded-2xl border border-border/80 bg-card/40 p-5">
                <p className="font-display text-lg">{m.title}</p>
                <p className="mt-2 text-[14px] leading-relaxed text-ink-soft">{m.body}</p>
              </li>
            ))}
          </ul>
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
