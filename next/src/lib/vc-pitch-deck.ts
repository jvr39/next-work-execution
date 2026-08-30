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

/** Pre-seed pitch: bet, killer risk, honest raise math. Freeze polish until interviews. */
export const vcPitchSlides: PitchSlide[] = [
  {
    id: 'title',
    section: 'Next',
    title: 'One Next. You do the craft.',
    body: 'Work execution for GTM. Prototype. Pre-revenue.',
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
    title: 'One Next. Prep done. You judge.',
    bullets: [
      'Put the right piece of work in front of you. Approve what goes out.',
      'When new information lands, replan — protect fixed meetings, insert the new Next.',
      'Day ends at enough, not inbox zero.',
    ],
    footer: 'V1 inputs: calendar + paste. Not magic Slack detection yet.',
    layout: 'split',
  },
  {
    id: 'killer',
    section: 'The real fight',
    title: 'Salesforce, HubSpot, and Microsoft already hold the data.',
    body: 'If they ship a credible one-Next on top of CRM + inbox + calendar, this company is in trouble. Productivity apps are a crowded shelf. Systems of record are the existential threat. We do not win by hoping they stay slow. We win only if cross-stack execution becomes a habit they cannot ship cleanly — starting with human-provided context (calendar, paste, forwards), not pretending we already read noisy Slack.',
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
      { label: 'Not v1', value: 'Autonomous inbox reading. Platform. Memory moat.' },
    ],
    layout: 'grid',
  },
  {
    id: 'plan',
    section: 'Raise',
    title: 'Raising $400k for ~15 months.',
    bullets: [
      'First 90 days: validation gate — spend ~$60–80k, not the whole raise.',
      'Days 1–14: ≥10 GTM interviews (pain, artifact, price). Hard stop if pain or pay won’t show.',
      'Days 15–90: Solo MVP (calendar + paste + one Next + replan) + real users.',
      'Day 90 keep if: ≥3 paying orgs or signed paid pilots, and ≥15 people returning on real work. Else kill.',
    ],
    footer: 'Founder + one builder. $400k is runway — not a 90-day costume.',
    layout: 'split',
  },
  {
    id: 'ask',
    section: 'The ask',
    title: 'Intros first. Capital second.',
    bullets: [
      'Intros to CS and Sales operators who will take a blunt interview this week.',
      '$400k SAFE against the 15-month plan — after interviews, not instead of them.',
      'Then the live day if you want the loop.',
    ],
    layout: 'close',
  },
  {
    id: 'waitlist',
    section: 'Stay close',
    title: 'Join the waitlist.',
    body: "Leave an email. We'll send when there is something to try.",
    layout: 'waitlist',
  },
]
