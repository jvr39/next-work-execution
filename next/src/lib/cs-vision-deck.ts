export type VisionSlide = {
  id: string
  chapter: string
  title: string
  line: string
  note?: string
  mock: 'title' | 'briefing' | 'risk' | 'approve' | 'interrupt' | 'meeting' | 'enough' | 'connect'
}

/** Short prospect path — 7 beats */
export const csVisionSlides: VisionSlide[] = [
  {
    id: 'open',
    chapter: 'Next for CS',
    title: 'One Next. Not a list.',
    line: 'Prep. Decide. Replan when the world moves. Stop at enough. You do the craft.',
    mock: 'title',
  },
  {
    id: 'brief',
    chapter: 'Morning',
    title: 'Risk before inbox.',
    line: 'Overnight: Acme flipped red. Next rebuilt the day so urgent revenue work lands first.',
    note: 'Health & renewals before Slack rabbit holes.',
    mock: 'briefing',
  },
  {
    id: 'risk',
    chapter: 'One Next',
    title: 'Evidence-backed judgment.',
    line: 'Gong, usage, Slack, CRM already pulled. You pick the approach. You approve what goes out.',
    note: 'Human judgment. AI dug the trench.',
    mock: 'risk',
  },
  {
    id: 'approve',
    chapter: 'AI prepared',
    title: 'Approve the follow-up.',
    line: 'Draft is ready. You skim the promise, tweak if needed, send. Admin → near zero.',
    mock: 'approve',
  },
  {
    id: 'interrupt',
    chapter: 'Replan',
    title: 'New information. New Next.',
    line: 'When the world moves, the plan moves. Fixed meetings stay. Lower work waits.',
    mock: 'interrupt',
  },
  {
    id: 'enough',
    chapter: 'Close',
    title: 'Enough for today.',
    line: 'Urgent cleared. The rest can wait. Not inbox zero — judgment. Time back, not list complete.',
    mock: 'enough',
  },
  {
    id: 'connect',
    chapter: 'Vision',
    title: 'Connected to the CS stack.',
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
