export type VisionSlide = {
  id: string
  chapter: string
  title: string
  line: string
  note?: string
  mock: 'title' | 'briefing' | 'risk' | 'approve' | 'interrupt' | 'tickets' | 'meeting' | 'oneone' | 'enough' | 'connect'
}

export const csVisionSlides: VisionSlide[] = [
  {
    id: 'open',
    chapter: 'Next for CS',
    title: 'A day with zero list-management.',
    line: 'One thing in front of you. You do the craft. Next carries the rest.',
    mock: 'title',
  },
  {
    id: 'brief',
    chapter: '09:02 · Morning',
    title: 'Risk before inbox.',
    line: 'Overnight: Acme flipped red. Next rebuilt the day so urgent revenue work lands first.',
    note: 'Best practice: health & renewals before Slack rabbit holes.',
    mock: 'briefing',
  },
  {
    id: 'risk',
    chapter: '09:15 · Next',
    title: 'Review Acme renewal risk.',
    line: 'Gong, usage, Slack, and CRM already pulled. You pick the approach. You approve what goes out.',
    note: 'Human judgment. AI dug the trench.',
    mock: 'risk',
  },
  {
    id: 'approve',
    chapter: '09:40 · Next',
    title: 'Approve the QBR follow-up.',
    line: 'Draft is ready. You skim the promise date, tweak if needed, send.',
    note: 'Admin → near zero.',
    mock: 'approve',
  },
  {
    id: 'interrupt',
    chapter: 'Interrupt',
    title: 'Plans aren’t sacred.',
    line: 'AE pings: customer won’t renew without exec cover this week. Next replans like Waze.',
    mock: 'interrupt',
  },
  {
    id: 'tickets',
    chapter: 'Connected · Support',
    title: 'See every open ticket. Intervene only when it matters.',
    line: 'Next reads Support. Filter unresolved on your book. Support owns the queue — you jump in for relationship risk.',
    note: 'Visibility ≠ becoming the help desk.',
    mock: 'tickets',
  },
  {
    id: 'meeting',
    chapter: '11:30 · Calendar',
    title: 'Forecast review starts now.',
    line: 'Agenda and deltas are ready. You run the room — that’s the craft.',
    mock: 'meeting',
  },
  {
    id: 'oneone',
    chapter: '13:00 · Coaching',
    title: '1:1 with Alex.',
    line: 'Last week’s calls, a sample agenda, one coaching focus. You show up and lead.',
    mock: 'oneone',
  },
  {
    id: 'enough',
    chapter: '16:10 · Close',
    title: 'Enough for today.',
    line: 'Urgent cleared. The adoption dig can wait until tomorrow. Not inbox zero — judgment.',
    mock: 'enough',
  },
  {
    id: 'connect',
    chapter: 'The vision',
    title: 'Connected to the whole CS stack.',
    line: 'Calendar, email, Slack, CRM, health, Gong, Support — one brain. You only execute.',
    mock: 'connect',
  },
]

export const ticketRows = [
  {
    id: 't1',
    account: 'Acme',
    subject: 'Workflow builder access after ops lead left',
    age: '4d',
    tone: 'Escalating',
    csm: true,
  },
  {
    id: 't2',
    account: 'Globex',
    subject: 'CSV export formatting',
    age: '1d',
    tone: 'Normal',
    csm: false,
  },
  {
    id: 't3',
    account: 'Initech',
    subject: 'SSO timeout on mobile',
    age: '2d',
    tone: 'Normal',
    csm: false,
  },
]
