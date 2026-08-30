export type PitchSlide = {
  id: string
  section: string
  title: string
  body?: string
  bullets?: string[]
  footer?: string
  layout: 'title' | 'split' | 'quote' | 'grid' | 'compare' | 'close' | 'waitlist'
  cells?: { label: string; value: string }[]
  left?: string
  right?: string
}

/** Short pre-seed pitch: sell the bet, name the killer risk, ask for 90 days. */
export const vcPitchSlides: PitchSlide[] = [
  {
    id: 'title',
    section: 'Next',
    title: 'One Next. You do the craft.',
    body: 'A work execution product for GTM. Prototype. Pre-revenue.',
    footer: 'Joseph Rivera',
    layout: 'title',
  },
  {
    id: 'problem',
    section: 'Problem',
    title: 'GTM people manage work instead of doing it.',
    bullets: [
      'The day is inbox, calendar, CRM, Slack, Support, call recordings — then the actual job.',
      'Task managers and AI calendars still make you groom a list.',
      'Vendor copilots sit inside one system. The job spans all of them.',
    ],
    layout: 'split',
  },
  {
    id: 'product',
    section: 'Product',
    title: 'Route the day. Leave judgment with the human.',
    bullets: [
      'One Next. Prep done. Approve what goes out.',
      'When reality changes, replan — like Waze, not a static to-do list.',
      'Day ends at enough, not inbox zero.',
    ],
    layout: 'split',
  },
  {
    id: 'killer',
    section: 'The real fight',
    title: 'Salesforce, HubSpot, and Microsoft already hold the data.',
    body: 'If they ship a credible one-Next on top of CRM + inbox + calendar, this company is in trouble. Productivity apps (Motion, Sunsama, Reclaim, ChatGPT) are the crowded shelf. The systems of record are the existential threat. We only win by being the cross-stack execution habit they are too slow or too siloed to become.',
    layout: 'quote',
  },
  {
    id: 'wedge',
    section: 'Wedge',
    title: 'Start in GTM. Show CS. Earn the habit.',
    cells: [
      { label: 'Who', value: 'CS, Sales, BDR, RevOps' },
      { label: 'Demo', value: 'A CS day — clearest story' },
      { label: 'V1', value: 'Calendar + paste + one Next + replan' },
      { label: 'Not v1', value: 'Every integration. Judgment memory. Platform.' },
    ],
    layout: 'grid',
  },
  {
    id: 'plan',
    section: '90 days',
    title: 'Raising $400k to prove or kill this.',
    bullets: [
      'Weeks 1-4: 10 GTM interviews (switch, trust, price). Stop if nobody will pay or connect tools.',
      'Weeks 4-12: Solo MVP — calendar + paste + one Next + interrupt replan.',
      'Day 90: 25 people who used it on real work, not the script. Keep or kill from that.',
    ],
    footer: 'Founder plus one builder. 90 days to prove or kill.',
    layout: 'split',
  },
  {
    id: 'ask',
    section: 'The ask',
    title: 'Intros and $400k.',
    bullets: [
      'Capital against the 90-day plan above.',
      'Intros to CS and Sales operators who will take a blunt interview this month.',
      'Try the live day after — the Waze interrupt is the product.',
    ],
    layout: 'close',
  },
  {
    id: 'waitlist',
    section: 'Stay close',
    title: 'Join the waitlist.',
    body: "Leave an email. We'll send when it's ready to try.",
    layout: 'waitlist',
  },
]
