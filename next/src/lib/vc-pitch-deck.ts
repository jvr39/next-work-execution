export type PitchSlide = {
  id: string
  section: string
  title: string
  body?: string
  bullets?: string[]
  footer?: string
  layout: 'title' | 'split' | 'quote' | 'grid' | 'compare' | 'close'
  cells?: { label: string; value: string }[]
  left?: string
  right?: string
}

export const vcPitchSlides: PitchSlide[] = [
  {
    id: 'title',
    section: 'Next',
    title: 'The operating layer for skilled work.',
    body: 'Next understands the job, absorbs coordination, and routes people through the day — judgment stays with them.',
    footer: 'Confidential · Prototype stage',
    layout: 'title',
  },
  {
    id: 'problem',
    section: 'Problem',
    title: 'Skilled people drown in coordination.',
    bullets: [
      'GTM roles lose ~40% of the day to triage, prep, and admin.',
      'Tools multiplied — CRM, Slack, Support, calendar, Gong — context did not.',
      'The job became managing work instead of doing it.',
    ],
    footer: 'CS, Sales, BDR, SE — same day shape.',
    layout: 'split',
  },
  {
    id: 'insight',
    section: 'Insight',
    title: 'Task managers make users manage lists. That is the wrong product.',
    body: 'People don’t want a smarter board. They want one clear Next, prep done, and a plan that replans when reality changes.',
    layout: 'quote',
  },
  {
    id: 'solution',
    section: 'Solution',
    title: 'Next is a work execution system.',
    bullets: [
      'Connected to the stack — calendar, email, Slack, CRM, health, Support.',
      'Puts one Next in front of you. Prepares drafts and evidence.',
      'Human decides, coaches, and approves. AI dug the trench.',
      'Interrupts replan the route. Day ends at “enough” — not inbox zero.',
    ],
    layout: 'split',
  },
  {
    id: 'product',
    section: 'Product',
    title: 'One question. One Next.',
    cells: [
      { label: 'Not this', value: 'Dashboards · lists · another AI chat' },
      { label: 'This', value: 'See next → do the craft → Done → replan' },
      { label: 'Human owns', value: 'Judgment, relationships, quality' },
      { label: 'Next owns', value: 'Triage, prep, admin, routing' },
    ],
    footer: 'Live prototype: CS day · vision deck + clickable loop',
    layout: 'grid',
  },
  {
    id: 'why-now',
    section: 'Why now',
    title: 'The stack is ready. The workflow is not.',
    bullets: [
      'AI can finally assemble context across tools in seconds.',
      'GTM teams already pay $15–40/mo for calendars and planners — and still feel load.',
      'Enterprises want sanctioned copilots; employees want something that actually runs the day.',
    ],
    layout: 'split',
  },
  {
    id: 'market',
    section: 'Market',
    title: 'Beachhead: GTM. Brand: broader.',
    cells: [
      { label: 'Doors', value: 'Next for CS · Sales · BDR · RevOps' },
      { label: 'Demo', value: 'Customer Success day (highest drama, clearest loop)' },
      { label: 'Also', value: 'Next for You — solo / small team (later)' },
      { label: 'Buyer', value: 'IC + manager who feel dropped balls and buy time back' },
    ],
    layout: 'grid',
  },
  {
    id: 'model',
    section: 'Model',
    title: 'Self-serve software. Card → seat.',
    bullets: [
      'Solo and Small Team — pay online, start same day.',
      'Price band to test: ~$19–29 / user / month (Pro).',
      'Land IC habit → expand to team seats and Next-to-Next scheduling.',
    ],
    footer: 'No enterprise sales motion required for v1.',
    layout: 'split',
  },
  {
    id: 'gtm',
    section: 'Go-to-market',
    title: 'Prove the habit. Then scale the door.',
    bullets: [
      'Message proof with CS demo → waitlist → self-serve trial.',
      'Primary channel: founder-led LinkedIn + warm GTM intros.',
      'Kill criteria: won’t switch from a paid tool, won’t trust inbox/calendar, no daily open.',
    ],
    layout: 'split',
  },
  {
    id: 'competition',
    section: 'Competition',
    title: 'Crowded shelf. Empty wedge.',
    left: 'Motion · Sunsama · Reclaim · Todoist AI · ChatGPT',
    right: 'List/calendar optimization or blank chat — user still manages work',
    body: 'Next sells an execution route: one Next, connected context, continuous replan, human approval. If the home screen becomes a list, we lose.',
    layout: 'compare',
  },
  {
    id: 'traction',
    section: 'Traction',
    title: 'Where we are — honestly.',
    bullets: [
      'Interactive prototype live (vision deck + full CS day loop).',
      'Product thesis locked: GTM beachhead, CS demo, human-in-the-loop.',
      'Next: 10 paid-intent interviews — switch, trust, $/month.',
    ],
    footer: 'Pre-revenue · seeking proof of daily habit + willingness to pay.',
    layout: 'split',
  },
  {
    id: 'moat',
    section: 'Moat',
    title: 'Habit + memory of how this person works.',
    bullets: [
      'Integrations are table stakes. Judgment patterns are the asset.',
      'Role outcomes, stakeholder prefs, “safe to automate” vs “you decide.”',
      'Wrong Next once → churn. Getting Next right compounds.',
    ],
    layout: 'split',
  },
  {
    id: 'team',
    section: 'Team',
    title: 'Joseph Rivera',
    body: 'Building Next. Deep instinct for GTM execution workflows — the demo is a CS director day for a reason. Solo founder + agent operating system; shipping the wedge before the platform.',
    layout: 'split',
  },
  {
    id: 'ask',
    section: 'The ask',
    title: 'Partner to prove the operating layer.',
    bullets: [
      'Capital to ship Solo self-serve: calendar + inbox + one Next + replan.',
      'Intros to GTM operators who feel this pain daily.',
      'Use of funds: product, design, first distribution — not a bloated team.',
    ],
    footer: 'Demo: jvr39.github.io/next-work-execution',
    layout: 'close',
  },
]
