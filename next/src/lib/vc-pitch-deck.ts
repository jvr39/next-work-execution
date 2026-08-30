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

/** Pre-seed honest deck — claims match stage */
export const vcPitchSlides: PitchSlide[] = [
  {
    id: 'title',
    section: 'Next',
    title: 'One clear Next. You do the craft.',
    body: 'A prototype for a work execution product aimed at GTM teams. Not a shipped platform. Not validated revenue.',
    footer: 'Pre-seed · Prototype · Seeking partners to validate',
    layout: 'title',
  },
  {
    id: 'problem',
    section: 'Problem',
    title: 'Skilled people spend the day coordinating, not executing.',
    bullets: [
      'Industry writeups often put ~40% of CS/sales time in admin and reactive triage — we’re testing whether that pain is acute enough to pay.',
      'Tools multiplied (CRM, Slack, Support, calendar, call intel). Context still lives in the person’s head.',
      'Existing “productivity” apps mostly give you another list or calendar to manage.',
    ],
    footer: 'Hypothesis — interviews must confirm.',
    layout: 'split',
  },
  {
    id: 'insight',
    section: 'Bet',
    title: 'The product people want is an execution route — not a smarter task manager.',
    body: 'One Next. Prep already done. Replan when reality changes. Human keeps judgment. If the UI becomes a list, we’ve failed our own thesis.',
    layout: 'quote',
  },
  {
    id: 'solution',
    section: 'What we’re building',
    title: 'Next: route the day. Leave craft with the human.',
    bullets: [
      'Intended loop: see Next → do / approve → Done → replan on interrupt → enough for today.',
      'Intended inputs over time: calendar, inbox, CRM, Support, call notes — starting narrow (calendar + paste), not “everything” day one.',
      'Not worker replacement. AI suggests; human decides what goes out.',
    ],
    layout: 'split',
  },
  {
    id: 'demo-honesty',
    section: 'What the demo is',
    title: 'A clickable fiction that shows the feeling — not the hard part.',
    bullets: [
      'The Acme story is scripted. Data is clean on purpose.',
      'It does not prove we can assemble correct context from messy Salesforce/Gong/Slack.',
      'It does prove the interaction we want to protect: one Next, evidence, decision, replan, enough-for-today.',
      'Role/Memory screens are explanatory seeds — capabilities we do not have yet.',
    ],
    footer: 'Anyone who’s shipped on those APIs will smell fake data. We say so up front.',
    layout: 'split',
  },
  {
    id: 'why-now',
    section: 'Why try now',
    title: 'Models got good enough to attempt this. The product is still unproven.',
    bullets: [
      'Cross-tool copilots are possible in theory — reliability is the open question.',
      'Buyers already pay ~$15–40/mo for Motion/Sunsama/Reclaim-class tools and still complain about load — suggests residual demand, not an empty shelf.',
      'We are not claiming the stack problem is solved. We’re claiming it’s worth a wedge.',
    ],
    layout: 'split',
  },
  {
    id: 'market',
    section: 'Beachhead',
    title: 'Start with GTM. Demo CS. Don’t pretend we’ve won “anyone.”',
    cells: [
      { label: 'First doors', value: 'CS · Sales · BDR · RevOps' },
      { label: 'Demo story', value: 'CS day — clearest narrative, not exclusive ICP' },
      { label: 'Later', value: 'Next for You (solo) only if GTM sticks' },
      { label: 'Buyer test', value: 'Will they drop a paid tool + grant calendar/inbox?' },
    ],
    layout: 'grid',
  },
  {
    id: 'model',
    section: 'Model (hypothesis)',
    title: 'Self-serve seats — price not locked.',
    bullets: [
      'Working hypothesis: Solo / Small Team, card checkout, ~$19–29/user/mo to A/B after interviews.',
      'That number is a guess until someone names a willingness-to-pay.',
      'Expansion ideas (team, Next-to-Next scheduling) are sequenced after habit — not the v1 pitch.',
    ],
    layout: 'split',
  },
  {
    id: 'gtm',
    section: 'Near-term plan',
    title: 'Interviews first. Product second. Distribution third.',
    bullets: [
      '10 paid-intent conversations: daily pain? switch? trust? $/mo?',
      'Kill if: “nice,” won’t replace a tool, won’t connect inbox/calendar, won’t open daily.',
      'Only then: Solo MVP (calendar + paste + one Next + replan) and a real waitlist→trial.',
    ],
    layout: 'split',
  },
  {
    id: 'competition',
    section: 'Competition',
    title: 'Crowded shelf. Contested wedge.',
    left: 'Motion · Sunsama · Reclaim · Todoist AI · ChatGPT · vendor copilots (Salesforce, HubSpot, Microsoft)',
    right: 'They already own lists, calendars, or the system of record',
    body: 'Our intended difference is ruthless: one Next + connected prep + continuous replan + human approval — without becoming another board. Incumbents can copy the line. We only win if the daily habit is better. We have not proven that yet.',
    layout: 'compare',
  },
  {
    id: 'risks',
    section: 'Risks we own',
    title: 'Where this dies.',
    bullets: [
      'Context assembly is wrong → users never trust Next.',
      'Wrong Next once or twice → churn (thin error tolerance).',
      'Incumbents ship “one Next” on top of data we don’t have.',
      'We overbuild platform before anyone pays for the loop.',
    ],
    layout: 'split',
  },
  {
    id: 'moat',
    section: 'Moat (aspirational)',
    title: 'If there is a moat, it is earned habit — not a slide.',
    bullets: [
      'We do not have proprietary judgment memory yet. The demo seeds what that could feel like.',
      'Integrations are hard and not commoditized for a solo team — calling them “table stakes” was wrong.',
      'Real moat candidates later: correctness of Next, switching cost of daily open, per-role packs that actually work.',
    ],
    layout: 'split',
  },
  {
    id: 'traction',
    section: 'Traction',
    title: 'Honest status.',
    bullets: [
      'Clickable prototype + CS vision deck live.',
      'Zero revenue. Zero completed customer interviews logged in this repo.',
      'Next milestone: 10 interviews with written notes (switch / trust / price).',
    ],
    footer: 'No fake logos. No fake ARR.',
    layout: 'split',
  },
  {
    id: 'team',
    section: 'Team',
    title: 'Joseph Rivera',
    body: 'Solo founder. Building in public with a working prototype. Bias: ship the execution loop for one GTM door before “connected to everything.”',
    layout: 'split',
  },
  {
    id: 'ask',
    section: 'The ask',
    title: 'Help us prove or kill this in 90 days.',
    bullets: [
      'Round/amount: TBD with you — sized to interviews + Solo MVP, not a platform army.',
      'Milestones: (1) 10 interviews written up (2) Solo MVP: calendar + paste + one Next + replan (3) 25 activated users, D7 execution retention target set from data.',
      'Also valuable: intros to CS/Sales operators who will take a blunt interview.',
    ],
    footer: 'Then we show the demo — labeled as fiction that protects the loop.',
    layout: 'close',
  },
  {
    id: 'waitlist',
    section: 'Stay close',
    title: 'Join the waitlist.',
    body: 'Prototype interest only. We’ll email when there’s something real to try — not vapor updates.',
    layout: 'waitlist',
  },
]
