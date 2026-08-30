export type WorkLevel = 'ai-prepared' | 'you-do-this'

export type Evidence = {
  kind: 'gong' | 'slack' | 'note' | 'chart' | 'email'
  label: string
  detail: string
}

export type DecisionOption = {
  id: string
  label: string
  hint: string
  prepared?: {
    title: string
    channel: string
    body: string
    evidence: string[]
  }
}

export type Action = {
  id: string
  window: string
  title: string
  why: string
  steps: string[]
  effort: string
  level: WorkLevel
  responsibility: string
  calendarConstraint?: string
  brief?: string
  workspace: {
    objective: string
    context: { label: string; value: string; urgent?: boolean }[]
    changed: string[]
    evidence: Evidence[]
    options: DecisionOption[]
  }
}

export const roleModel = {
  name: 'Joe',
  title: 'Director of Customer Success',
  company: 'Northline',
  measuredBy: [
    'Net revenue retention',
    'Forecast accuracy',
    'Team ramp & attrition',
    'Escalation cycle time',
  ],
  weights: [
    { label: 'Customer retention', value: 30 },
    { label: 'Team management', value: 25 },
    { label: 'Forecasting', value: 15 },
    { label: 'Escalations', value: 10 },
    { label: 'Cross-functional', value: 10 },
    { label: 'Hiring / admin', value: 10 },
  ],
  outcomes: [
    {
      outcome: 'Maintain an accurate renewal forecast',
      recurring: 'Wednesday forecast review · weekly commit hygiene pass',
    },
    {
      outcome: 'No enterprise account churns unseen',
      recurring: 'Daily risk sweep · exec escalation within 48h',
    },
    {
      outcome: 'Every CSM improves one skill per quarter',
      recurring: 'Weekly 1:1s · call review + coaching note',
    },
  ],
  stakeholders: [
    {
      name: 'Jamie Okafor',
      relation: 'VP Customer Success — your manager',
      priority: 'High',
      prefs: 'Concise Slack. Risk before metrics.',
      note: 'Wants renewal risk flagged before it hits the board deck.',
      cadence: '1:1 Thursday',
    },
    {
      name: 'Alex Rhee',
      relation: 'Direct report — CSM, mid-market',
      priority: 'High',
      prefs: 'Coaching in the moment, not after the fact.',
      note: 'Coaching topic: discovery questions on exec calls.',
      cadence: 'Weekly 1:1 · Friday',
    },
    {
      name: 'Sarah Delgado',
      relation: 'Enterprise AE — owns Acme',
      priority: 'Medium',
      prefs: 'Escalates via Slack; expects same-day reply.',
      note: 'Asked you for exec sponsorship yesterday.',
      cadence: 'Ad hoc · #acme-deal',
    },
    {
      name: 'James Whitfield',
      relation: 'Acme VP Operations — economic buyer',
      priority: 'High',
      prefs: 'No slides. Direct asks.',
      note: 'Went quiet after the Q3 usage dip.',
      cadence: 'Customer calls as needed',
    },
    {
      name: 'Priya Nair',
      relation: 'Enterprise CSM — owns Acme day-to-day',
      priority: 'Medium',
      prefs: 'CRM notes before Slack.',
      note: 'Silent since Tuesday — red flag for Acme.',
      cadence: 'Daily stand-up',
    },
  ],
}

export const workGraph = {
  name: 'Acme Renewal',
  links: [
    { label: 'Salesforce opportunity', value: 'OPP-18492 · Enterprise Renewal' },
    { label: 'ARR', value: '$420,000' },
    { label: 'Renewal date', value: 'September 24' },
    { label: 'Health', value: 'Red' },
    { label: 'CSM', value: 'Priya Nair' },
    { label: 'AE', value: 'Sarah Delgado' },
    { label: 'Last Gong', value: 'Yesterday 4:10 PM' },
    { label: 'Slack', value: '#acme-deal · 14 unread' },
    { label: 'Usage', value: '−22% WAU since Aug 4' },
    { label: 'Open risk', value: 'Competitor evaluation named' },
  ],
}

export const workMemory = [
  {
    title: 'How you decide',
    body: 'You escalate enterprise risk when usage drops >15% and a competitor is named in the same week. You almost never escalate on sentiment alone.',
  },
  {
    title: 'What Jamie cares about',
    body: 'Forecast accuracy first. Customer color second. She reads Slack before email and hates surprise board-deck risk.',
  },
  {
    title: 'Your communication pattern',
    body: 'Customer messages: short, ownership-forward, one clear ask. Internal: bullets, then the ask.',
  },
  {
    title: 'Time estimates',
    body: 'You take ~1.4× longer on coaching 1:1s than you schedule. Escalation drafts you approve in under 4 minutes when evidence is pre-pulled.',
  },
  {
    title: 'Recurring blind spots',
    body: 'You defer CRM hygiene until Friday — then it collides with forecast. I surface one hygiene pass mid-week now.',
  },
  {
    title: 'Safe to automate',
    body: 'Account briefs, Gong excerpts, forecast delta tables, routine customer recaps. You still want the pen on pricing and exec escalations.',
  },
]

export const briefing = {
  greeting: 'Good morning, Joe.',
  usableTime: '5h 10m',
  found: 14,
  needToday: 6,
  biggestChange: "Acme's renewal is now at risk.",
  rearranged: "I've rearranged your afternoon accordingly.",
  finishBy: '4:20 PM',
  nextMeeting: { time: '11:30', label: 'Team forecast review', minutesUntil: 32 },
  timeline: [
    { time: '9:15', label: 'Review Acme renewal risk', tag: 'moved up', urgent: true },
    { time: '9:40', label: 'Approve Globex QBR follow-up', tag: 'AI prepared' },
    { time: '11:30', label: 'Team forecast review', tag: 'you do this' },
    { time: '12:00', label: 'Lunch', tag: 'protected' },
    { time: '12:30', label: 'Approve 3 customer responses', tag: 'AI prepared' },
    { time: '1:00', label: '1:1 with Alex', tag: 'you do this' },
    { time: '1:30', label: 'Investigate Globex adoption decline', tag: 'moved down' },
  ],
}

export const interruptEvent = {
  id: 'acme-bake-off',
  from: 'Sarah Delgado',
  channel: 'Slack · #acme-deal',
  message:
    'New: James forwarded an internal thread — Competitor X is in a final bake-off Friday. Your escalate path isn’t enough. Need a 1-page save plan for Jamie before forecast.',
  effect:
    "I've inserted a new Next — Prep Acme exec save plan — ahead of forecast. Globex adoption stays after lunch. Your 11:30 forecast review still stands.",
  newOrder: [
    'acme-save-plan',
    'forecast-review',
    'approve-responses',
    'one-on-one-alex',
    'globex-qbr-followup',
    'globex-adoption',
  ] as string[],
}

export const defaultOrder = [
  'acme-renewal-risk',
  'globex-qbr-followup',
  'forecast-review',
  'approve-responses',
  'one-on-one-alex',
  'globex-adoption',
] as string[]

export const queue: Action[] = [
  {
    id: 'acme-save-plan',
    window: 'Now',
    title: 'Prep Acme exec save plan',
    why: 'Bake-off Friday. Jamie needs a one-pager before she joins James — usage dip, competitor, and the ask.',
    steps: [
      'Confirm the three facts on the brief.',
      'Approve the one-pager draft for Jamie.',
      'Send it before forecast so she is not blindsided.',
    ],
    effort: '15 min',
    level: 'ai-prepared',
    responsibility: 'Customer retention',
    calendarConstraint: 'Before 11:30 forecast',
    brief:
      'New overnight thread: Competitor X in final bake-off Friday. Sarah needs Jamie armed before the forecast call. Draft pulls usage, Gong competitor mention, and the re-onboarding ask.',
    workspace: {
      objective: 'Get Jamie a crisp save plan before forecast — not a slide deck.',
      context: [
        { label: 'Deadline', value: 'Before 11:30', urgent: true },
        { label: 'ARR', value: '$420K' },
        { label: 'Threat', value: 'Bake-off Friday', urgent: true },
        { label: 'Owner', value: 'Jamie + you' },
      ],
      changed: [
        'Internal Acme thread names Competitor X for Friday bake-off.',
        'Escalate path from this morning is still on — this is the ammo for Jamie.',
      ],
      evidence: [
        {
          kind: 'slack',
          label: 'Slack · #acme-deal',
          detail: 'Sarah: Bake-off Friday. Jamie needs the one-pager before forecast.',
        },
        {
          kind: 'email',
          label: 'Forwarded thread · James',
          detail: '"Procurement asked us to finish the X evaluation this week."',
        },
        {
          kind: 'chart',
          label: 'Usage · already in brief',
          detail: 'WAU −22% since Aug 4 — same chart as morning risk review.',
        },
      ],
      options: [
        {
          id: 'send-jamie',
          label: 'Approve & send one-pager to Jamie',
          hint: 'She gets facts + ask before forecast.',
          prepared: {
            title: 'Acme save plan · for Jamie',
            channel: 'Slack DM · drafted',
            body: "Jamie — before forecast: Acme $420K, renewal Sept 24, WAU −22% since ops lead left Aug 4, Competitor X bake-off Friday. Ask: join me + James Thu 25 min with a re-onboarding plan; if it misses, we discuss renewal on their terms. Sarah is aligned. One-pager attached in thread.",
            evidence: ['Usage trend', 'Gong competitor mention', 'Sarah Slack'],
          },
        },
        {
          id: 'edit-first',
          label: 'Edit the draft first',
          hint: 'Opens the draft for a quick pass.',
        },
        {
          id: 'defer',
          label: 'Park until after forecast',
          hint: "I'll warn you it's late for Jamie.",
        },
      ],
    },
  },
  {
    id: 'acme-renewal-risk',
    window: '9:15–9:35',
    title: 'Review Acme renewal risk',
    why: 'Renewal in 26 days. Usage fell 22% and a competitor was named yesterday.',
    steps: [
      'Read the account brief I assembled (2 min).',
      'Review the 90-second Gong excerpt where the competitor came up.',
      'Ask Sarah two questions: who owns budget now, and what changed after the Q3 dip.',
      "Send James the Slack update I've drafted for you.",
    ],
    effort: '20 min',
    level: 'you-do-this',
    responsibility: 'Customer retention',
    calendarConstraint: '32 min before forecast review',
    brief:
      'Acme is a 4-year customer. Ops lead churned Aug 4; usage followed. Competitor X named yesterday for the first time. Priya went dark Tuesday after promising a health note. Sarah needs exec sponsorship before James will take another meeting.',
    workspace: {
      objective: 'Determine whether Acme needs executive intervention.',
      context: [
        { label: 'Renewal', value: '$420K ARR' },
        { label: 'Date', value: 'Sept 24' },
        { label: 'Health', value: 'Red', urgent: true },
        { label: 'Last call', value: 'Yesterday, 4:10 PM' },
      ],
      changed: [
        "Competitor named on yesterday's call for the first time in 11 months.",
        'Weekly active usage down 22% across the ops team since Aug 4.',
        'Sarah (AE) requested an executive sponsor in #acme-deal at 7:52 AM.',
      ],
      evidence: [
        {
          kind: 'gong',
          label: 'Gong · Acme QBR, 01:42–03:10',
          detail: '"We\'re being asked to look at alternatives before we commit for another year."',
        },
        {
          kind: 'slack',
          label: 'Slack · #acme-deal',
          detail: "Sarah: Need exec air cover — James won't take my meeting alone.",
        },
        {
          kind: 'note',
          label: 'CSM note · Priya, Tuesday',
          detail: 'Ops lead left. Nobody has been re-onboarded on the new workflow builder.',
        },
        {
          kind: 'chart',
          label: 'Usage · 30-day trend',
          detail: 'Seats active 41 → 32. Workflow runs −22%. Admin logins flat.',
        },
      ],
      options: [
        {
          id: 'escalate',
          label: 'Escalate to executive sponsor',
          hint: 'Loop Jamie in and offer James a joint call this week.',
          prepared: {
            title: 'Slack update to James Whitfield',
            channel: "Slack DM · drafted from Gong, usage data, and Sarah's notes",
            body: "James — I reviewed yesterday's call and our usage data together. Two things stood out: your ops team lost their power user in early August, and workflow runs are down 22% since. That's on us to fix, not on you to absorb.\n\nI'd like to bring Jamie (our VP of CS) and put a re-onboarding plan in front of you Thursday — 25 minutes, no slides. If the plan doesn't clear the bar, we'll talk about the renewal on your terms.",
            evidence: [
              'Gong excerpt 01:42–03:10',
              'Usage trend, Aug 4 – Sept 1',
              "Priya's CSM note (Tue)",
            ],
          },
        },
        {
          id: 'ask-csm',
          label: 'Ask CSM for more info',
          hint: 'Send Priya three specific questions before you commit exec time.',
          prepared: {
            title: 'Questions for Priya',
            channel: 'Slack DM · drafted',
            body: "Priya — before I loop Jamie: (1) Has James named a decision date? (2) Who replaced the ops lead on the workflow builder? (3) Any product ask we haven't logged? Need this by 11 so I can still protect forecast.",
            evidence: ['Last CSM note Tue', '#acme-deal thread'],
          },
        },
        {
          id: 'customer-call',
          label: 'Schedule customer call',
          hint: 'Hold 30 min with James Thursday, no exec loop-in yet.',
        },
        {
          id: 'defer',
          label: 'Defer to tomorrow',
          hint: "I'll re-surface this at 8:30 AM with any overnight change.",
        },
      ],
    },
  },
  {
    id: 'globex-qbr-followup',
    window: '9:40–9:50',
    title: 'Approve Globex QBR follow-up',
    why: 'The QBR ended without next steps. I drafted the recap and the two commitments Globex asked for; it needs your judgment on the timeline promise.',
    steps: [
      'Read the drafted recap (90 seconds).',
      'Check the delivery date I promised for the reporting fix.',
      'Approve, or send it back with the date you actually want.',
    ],
    effort: '10 min',
    level: 'ai-prepared',
    responsibility: 'Cross-functional',
    calendarConstraint: 'Fits before 11:30 with 8 min buffer',
    brief:
      'Alex ran his first solo exec QBR. Globex asked for a reporting fix date and nobody answered live. Product confirmed Sept 18. You own the credibility of the promise.',
    workspace: {
      objective: 'Get a credible commitment in front of Globex before their board review.',
      context: [
        { label: 'Account', value: 'Globex · $180K ARR' },
        { label: 'QBR', value: 'Yesterday, 2:00 PM' },
        { label: 'Health', value: 'Yellow' },
        { label: 'Owner', value: 'Alex Rhee' },
      ],
      changed: [
        'Globex asked for a reporting fix date on the call; nobody answered.',
        'Product confirmed the fix lands in the Sept 18 release.',
      ],
      evidence: [
        {
          kind: 'email',
          label: 'Draft email · Globex recap',
          detail: 'Three commitments, one owner each, dates attached.',
        },
        {
          kind: 'slack',
          label: 'Slack · #product-releases',
          detail: 'Reporting export fix scheduled for the Sept 18 train.',
        },
      ],
      options: [
        {
          id: 'approve',
          label: 'Approve and send recap',
          hint: 'Goes out as you, with the Sept 18 date.',
          prepared: {
            title: 'QBR recap to the Globex team',
            channel: 'Email · drafted from the call transcript and release notes',
            body: "Thanks for a direct conversation yesterday. Three things we owe you:\n\n1. Reporting export fix — shipping in our Sept 18 release. I'll confirm the day it lands.\n2. Two admin training sessions for the new ops hires — Alex will send times this week.\n3. A usage baseline we both agree on before your board review.\n\nIf any of these are wrong or thin, tell me and I'll fix the plan, not the wording.",
            evidence: ['QBR transcript, 34:10', 'Release calendar (Sept 18)'],
          },
        },
        {
          id: 'revise',
          label: 'Send back for a later date',
          hint: "I'll re-draft with a Sept 25 commitment.",
        },
        {
          id: 'defer',
          label: 'Defer to after forecast review',
          hint: 'Re-surfaces at 1:15 PM.',
        },
      ],
    },
  },
  {
    id: 'forecast-review',
    window: '11:30–12:00',
    title: 'Team forecast review',
    why: 'Two renewals moved category overnight and your commit number no longer matches what the team believes. Jamie presents this Thursday.',
    steps: [
      'Review the three deltas I flagged in the commit sheet.',
      "Decide Acme's category before the call, not during it.",
      'Ask each CSM for the single reason their number changed.',
      "Lock the commit number and I'll send the summary to Jamie.",
    ],
    effort: '30 min',
    level: 'you-do-this',
    responsibility: 'Forecasting',
    calendarConstraint: 'Fixed meeting · room 4B + Zoom',
    brief:
      'Commit drifted −$230K week over week. Acme out, Initech in. Three CSMs changed categories without notes — ask live. Jamie needs a number she can defend Thursday.',
    workspace: {
      objective: "Leave the meeting with a commit number you'd defend to the board.",
      context: [
        { label: 'Quarter', value: 'Q3 · 12 days left' },
        { label: 'Commit', value: '$2.41M' },
        { label: 'At risk', value: '$610K', urgent: true },
        { label: 'Attendees', value: '6 CSMs' },
      ],
      changed: [
        'Acme ($420K) moved from Likely to At Risk.',
        'Initech ($190K) upgraded to Commit after a signed order form.',
      ],
      evidence: [
        {
          kind: 'chart',
          label: 'Forecast delta · week over week',
          detail: 'Commit −$230K, Upside +$95K.',
        },
        {
          kind: 'note',
          label: 'Prep note',
          detail: 'Three CSMs changed a category without a note. Ask them live.',
        },
      ],
      options: [
        {
          id: 'lock',
          label: 'Lock the number I proposed',
          hint: '$2.41M commit, Acme excluded.',
          prepared: {
            title: 'Forecast summary to Jamie Okafor',
            channel: 'Slack DM · drafted from the commit sheet',
            body: "Q3 commit locked at $2.41M. Acme ($420K) is out of commit until Thursday — exec plan in motion, I'll call it either way by Friday AM. Initech (+$190K) moved in on a signed order form. Net change from last week: −$40K.",
            evidence: ['Commit sheet v14', 'Week-over-week delta'],
          },
        },
        {
          id: 'hold',
          label: 'Hold until Acme resolves',
          hint: "I'll re-open this Friday morning.",
        },
      ],
    },
  },
  {
    id: 'approve-responses',
    window: '12:30–12:45',
    title: 'Approve 3 customer responses',
    why: 'Three replies are drafted and waiting on you. All three are past the 24-hour response promise you set for the team.',
    steps: [
      "Skim each draft — they're short on purpose.",
      'Approve the two routine ones.',
      'Rewrite the pricing answer in your own words.',
    ],
    effort: '15 min',
    level: 'ai-prepared',
    responsibility: 'Customer retention',
    calendarConstraint: 'After lunch · before Alex 1:1',
    brief:
      'Two routine replies are safe. Vandelay turned into pricing overnight — that one stays in your hands.',
    workspace: {
      objective: 'Clear the response queue without letting a pricing answer go out unsupervised.',
      context: [
        { label: 'Waiting', value: '3 replies' },
        { label: 'Oldest', value: '31 hours', urgent: true },
        { label: 'Accounts', value: 'Soylent · Hooli · Vandelay' },
        { label: 'Risk', value: 'Low' },
      ],
      changed: ["Vandelay's question turned into a pricing question overnight."],
      evidence: [
        {
          kind: 'email',
          label: 'Draft 1 · Soylent onboarding date',
          detail: 'Confirms Sept 8 kickoff with the ops team.',
        },
        {
          kind: 'email',
          label: 'Draft 2 · Hooli SSO question',
          detail: 'Points to the SAML doc and offers a 15-min setup call.',
        },
        {
          kind: 'email',
          label: 'Draft 3 · Vandelay pricing',
          detail: 'Needs your words — discount language flagged.',
        },
      ],
      options: [
        {
          id: 'approve-two',
          label: 'Approve two, hold the pricing one',
          hint: 'Vandelay comes back to you at 4:00 PM.',
          prepared: {
            title: 'Two replies sent as you',
            channel: 'Email · Soylent and Hooli',
            body: "Both replies are out. Vandelay is held for you — I've pulled their contract terms and last two discount approvals into the thread so you can answer in one pass.",
            evidence: ['Vandelay MSA §4', 'Discount history (2 approvals)'],
          },
        },
        {
          id: 'approve-all',
          label: 'Approve all three',
          hint: 'Not recommended — pricing language is unreviewed.',
        },
      ],
    },
  },
  {
    id: 'one-on-one-alex',
    window: '1:00–1:30',
    title: '1:1 with Alex',
    why: "Alex has had the same coaching topic for three weeks — discovery questions on exec calls. Yesterday's Globex QBR is the perfect example to review together.",
    steps: [
      'Play the 2-minute Globex clip where the exec question got dropped.',
      "Ask Alex what he'd ask differently, before you offer your version.",
      "Agree one measurable thing for next week's call.",
      "I'll log the coaching note when you're done.",
    ],
    effort: '30 min',
    level: 'you-do-this',
    responsibility: 'Team management',
    calendarConstraint: 'Protected 1:1 · do not skip',
    brief:
      'Same coaching topic three weeks running. Yesterday was his first solo exec QBR — use the clip, not a lecture. Leave with one practice rep scheduled.',
    workspace: {
      objective: "Move Alex's discovery skill from talked-about to practiced.",
      context: [
        { label: 'Report', value: 'Alex Rhee' },
        { label: 'Topic', value: 'Exec discovery' },
        { label: 'Streak', value: '3 weeks open', urgent: true },
        { label: 'Evidence', value: 'Globex QBR' },
      ],
      changed: ['Alex ran his first solo exec QBR yesterday.'],
      evidence: [
        {
          kind: 'gong',
          label: 'Gong · Globex QBR 12:04–14:02',
          detail: 'Exec asks about board reporting; conversation moves to features.',
        },
        {
          kind: 'note',
          label: 'Coaching history',
          detail: 'Aug 12, Aug 19, Aug 26 — same topic, no practice rep logged.',
        },
      ],
      options: [
        {
          id: 'log',
          label: 'Log the coaching plan',
          hint: "One practice rep before Thursday's Initech call.",
          prepared: {
            title: 'Coaching note for Alex',
            channel: 'Note · drafted from your 1:1',
            body: "Focus: exec discovery. Practice rep — on Thursday's Initech call, ask one business-outcome question before any feature talk, then stop and let silence do the work. We review the clip together Friday.",
            evidence: ['Globex QBR clip', 'Coaching history (3 sessions)'],
          },
        },
        {
          id: 'defer',
          label: 'Defer the note',
          hint: "I'll ask you again after Friday's review.",
        },
      ],
    },
  },
  {
    id: 'globex-adoption',
    window: '1:30–2:00',
    title: 'Investigate Globex adoption decline',
    why: 'Adoption dropped 14% over three weeks while the account stayed quiet. Quiet plus declining is the pattern that preceded your last two churns.',
    steps: [
      'Compare the two teams that diverged — ops is flat, finance fell off.',
      'Check whether the August permission change caused it.',
      'Decide: training gap or product gap.',
      'Hand the answer to Alex with a date.',
    ],
    effort: '30 min',
    level: 'you-do-this',
    responsibility: 'Customer retention',
    calendarConstraint: 'Open block after Alex',
    brief:
      'Finance usage collapsed after the Aug 19 permission change. Pattern matches your last two quiet churns. Name the cause before renewal season.',
    workspace: {
      objective: 'Name the cause of the decline before it becomes a renewal conversation.',
      context: [
        { label: 'Account', value: 'Globex' },
        { label: 'Adoption', value: '−14% / 3 wks', urgent: true },
        { label: 'Renewal', value: 'Jan 12' },
        { label: 'Owner', value: 'Alex Rhee' },
      ],
      changed: [
        'Finance team logins dropped to near zero after the Aug 19 permission change.',
      ],
      evidence: [
        {
          kind: 'chart',
          label: 'Adoption by team',
          detail: 'Ops flat, Finance −61%, Support +4%.',
        },
        {
          kind: 'slack',
          label: 'Slack · #globex',
          detail: 'Alex: they asked about read-only seats around then.',
        },
      ],
      options: [
        {
          id: 'training',
          label: 'Call it a training gap',
          hint: 'Two admin sessions, owned by Alex, this month.',
        },
        {
          id: 'product',
          label: 'Call it a product gap',
          hint: "I'll open a product ticket with the usage evidence attached.",
          prepared: {
            title: 'Product ticket · Globex read-only seats',
            channel: 'Ticket · drafted with usage evidence',
            body: 'Finance-team usage at Globex fell 61% immediately after the Aug 19 permission change. Hypothesis: no read-only role, so finance users lost access rather than being downgraded. Requesting a read-only seat type or a documented workaround before their Jan 12 renewal.',
            evidence: ['Adoption by team chart', 'Permission change log, Aug 19'],
          },
        },
        {
          id: 'defer',
          label: 'Defer to tomorrow',
          hint: 'Re-surfaces after the morning risk sweep.',
        },
      ],
    },
  },
]

export const actionsById = Object.fromEntries(queue.map((a) => [a.id, a])) as Record<
  string,
  Action
>

export const accountabilityOptions = [
  'Manage CSMs',
  'Forecast renewals',
  'Coach the team',
  'Escalate customer risk',
  'CRM hygiene',
  'Hiring',
  'Weekly business review',
  'Exec reporting',
  'Cross-functional escalations',
]

export const meetingOptions = [
  'Monday pipeline stand-up',
  'Wednesday forecast review',
  'Weekly 1:1s with each CSM',
  'Monthly business review with Jamie',
  'Customer QBRs',
  'Hiring loops',
]

export const prototypeGuide = [
  {
    title: 'One question',
    body: 'Everything exists to answer: what should I do next? Resist looking for a dashboard.',
  },
  {
    title: 'Press Next',
    body: 'Enter the workspace. Read the evidence. Make a decision. Approve anything AI prepared.',
  },
  {
    title: 'Press Done',
    body: 'The route updates. Try the “Simulate Slack interrupt” control once — that’s the Waze moment.',
  },
  {
    title: 'Look under the hood',
    body: 'Role, Stakeholders, and Memory show the model that makes priorities feel personal.',
  },
]
