import { Link } from 'react-router-dom'
import { NavLinks, Page, TopBar } from '@/components/Chrome'
import { roleModel, workGraph } from '@/lib/next-data'

export function RolePage() {
  return (
    <>
      <TopBar right={<NavLinks />} />
      <Page>
        <div className="animate-rise pt-8">
          <p className="text-eyebrow">Role model</p>
          <h1 className="font-display mt-3 text-[clamp(1.9rem,4.5vw,2.8rem)] font-semibold leading-tight tracking-tight">
            {roleModel.name} · {roleModel.title}
          </h1>
          <p className="mt-3 text-[15px] text-ink-soft">
            {roleModel.company} — why Joe exists in the organization, not just which apps he
            connects.
          </p>
        </div>

        <section className="mt-12">
          <p className="text-eyebrow">How he&apos;s measured</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {roleModel.measuredBy.map((m) => (
              <li
                key={m}
                className="rounded-full border border-border bg-card px-3 py-1.5 text-[13px] text-ink-soft"
              >
                {m}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-12">
          <p className="text-eyebrow">Weight of the job</p>
          <div className="mt-4 space-y-4">
            {roleModel.weights.map((w) => (
              <div key={w.label}>
                <div className="flex justify-between text-[15px]">
                  <span>{w.label}</span>
                  <span className="font-display text-sm text-ink-soft">{w.value}%</span>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full rounded-full bg-urgent"
                    style={{ width: `${w.value * 2}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <p className="text-eyebrow">Outcomes → recurring work</p>
          <ul className="mt-3 divide-y divide-border">
            {roleModel.outcomes.map((o) => (
              <li key={o.outcome} className="py-4">
                <p className="text-[15px]">{o.outcome}</p>
                <p className="mt-1 text-sm text-muted-foreground">{o.recurring}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-14">
          <p className="text-eyebrow">Stakeholder graph</p>
          <ul className="mt-4 space-y-4">
            {roleModel.stakeholders.map((s) => (
              <li key={s.name} className="rounded-2xl border border-border/80 bg-card/40 p-5">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="font-display text-xl">{s.name}</p>
                  <span className="text-[11px] tracking-wide text-urgent-foreground uppercase">
                    {s.priority} priority
                  </span>
                </div>
                <p className="mt-1 text-[14px] text-ink-soft">{s.relation}</p>
                <p className="mt-3 text-[14px] leading-relaxed text-muted-foreground">{s.note}</p>
                <p className="mt-3 text-[12px] text-muted-foreground">
                  Prefers: {s.prefs} · {s.cadence}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-14">
          <p className="text-eyebrow">Work graph · {workGraph.name}</p>
          <ul className="mt-4 divide-y divide-border">
            {workGraph.links.map((l) => (
              <li key={l.label} className="flex flex-wrap items-baseline justify-between gap-2 py-3">
                <span className="text-[13px] text-muted-foreground">{l.label}</span>
                <span className="text-[14px] text-foreground">{l.value}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-muted-foreground">
            Nobody created a task called “Investigate Acme.” The graph made it Joe&apos;s #1.
          </p>
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
