# Next — full prototype outline (self-serve buy)

**Status:** Outline only — do **not** build yet  
**Goal:** Show what a real “go to website → pay with card → use it” product would look like  
**Who it’s for in this story:** Anyone buying alone first (example: content creator). Small team optional.

---

## Big picture (one breath)

Someone lands on the site → picks Solo or Small Team → pays with a card → opens Next → connects a few things (or pastes for now) → every day they just get **one Next** → Done → next. Billing and settings live in the background.

---

## Who can buy (v1 licenses)

| Plan | Who | Rough idea |
|------|-----|------------|
| **Solo** | One person (creator, IC, freelancer) | One seat, your tools |
| **Small Team** | ~2–10 people | Each person gets their own Next; optional shared calendar / Next-to-Next booking later |

No enterprise sales call. No “contact us.” Card → access.

*(Many SaaS companies start exactly this way: Stripe + self-serve.)*

---

## Prototype map (screens / steps)

Think of this as a clickable movie of the product. 12 beats.

### A. Marketing site

**1. Home**  
- Line: *Do the work. Leave the load.*  
- Short video or GIF of: one task → Done → next  
- Big button: **Start free trial** / **See pricing**  
- Example day: content creator (not only CS)

**2. How it works** (3 steps)  
1. Next learns your world (calendar, inbox, tools — or paste to start)  
2. It puts one thing in front of you  
3. You do the skilled part → Done  

**3. Pricing**  
- Solo: $X / month (card)  
- Small Team: $Y / seat / month  
- Toggle monthly / yearly  
- FAQ: “Does this replace me?” → No. You do the craft. Next kills admin.

**4. Checkout (Stripe-style)**  
- Email  
- Card  
- Plan choice  
- Pay → “You’re in”

---

### B. First-time setup (~5 minutes)

**5. Welcome**  
“We’ll get you to your first Next. Takes a few minutes.”

**6. Who are you?** (optional, not a trap)  
- Role chips: Creator / Sales / CS / Engineer / Other + free text  
- Work hours (e.g. 9–5)  
- “What drains you most?” (inbox, calendar, prep, follow-ups)

**7. Connect (pick what you have)**  
- Calendar (Google / Outlook)  
- Email (or “paste for now”)  
- Later slots: Slack, CRM, social tools — greyed / “coming”  
- Clear line: *You approve anything that sends or books.*

**8. First briefing**  
- “Here’s what I see today”  
- 3–5 suggested items (fake or real)  
- User taps **Start my day**

---

### C. The daily product (the heart)

**9. Home = only ONE Next**  
Not a board. One card.

Examples for a **content creator** day:
1. Reply to this brand email (draft suggested) → Done  
2. Film the hook for tomorrow’s video (script outline ready) → Done  
3. Call in 20 min — prep notes → Done  
4. Edit / publish checklist for the draft that’s due → Done  
5. “You’ve cleared the urgent stuff. Rest can wait till tomorrow.”  

Same pattern for CS / sales / SE — only the *content* of the card changes.

**On each Next card**
- What to do (one sentence)  
- Why now (deadline / person / money)  
- **Suggestion** (AI approach — optional)  
- Tools / links / draft  
- Buttons: **Do it** · **Skip** · **Done** · **Needs human judgment**  

**10. During the day**  
- Clock-aware (“on track” / “behind on urgent”)  
- Interrupt: new email or ping → “Replan?” → new Next  
- Calendar nudge: “Move this deep work block?” (recommend, don’t force)

**11. End of day**  
- What got Done  
- What’s parked for tomorrow  
- “Enough for today” — not inbox zero

---

### D. Account stuff (boring but real)

**12. Settings / billing**  
- Plan + seats  
- Update card / cancel  
- Connections on/off  
- Privacy: what’s recorded (meetings/screen = later; say what’s on/off)  
- Invite teammates (Small Team)

---

## Solo vs Small Team in the prototype

| | Solo | Small Team |
|--|------|------------|
| Buy | 1 seat at checkout | Add seat count at checkout |
| Day | Your Next only | Each person has their own Next |
| Extra (show as “soon” or light) | — | “Ask Alex’s Next for a 30-min sync” → both approve → calendar invite |

Keep team features thin in the first prototype. Don’t build full enterprise.

---

## What to fake vs what’s real in a prototype

**Can be fake / scripted (clickthrough)**  
- Emails, brand deals, meeting notes  
- “AI suggestion” text  
- On-track meter  
- Next-to-Next booking happy path  

**Should feel real even in prototype**  
- Checkout flow shape (even if test mode)  
- One-Next UI (never a big list as home)  
- Done → next loop  
- Enough-for-today moment  

---

## Click path to demo to a friend (10 minutes)

1. Home → Pricing → Solo → Checkout (test card)  
2. Welcome → Creator → Connect calendar (or skip)  
3. Start my day  
4. Do 3 Next cards → Done  
5. Simulate interrupt → accept replan  
6. Hit “enough for today”  
7. Open billing (see Solo plan)

That’s the whole story.

---

## Build order later (when we actually ship)

1. Marketing page + pricing + Stripe Solo  
2. Auth + One-Next shell + Done loop  
3. Calendar + paste inbox  
4. Suggestions on cards  
5. Small Team seats + invite  
6. Deeper tools / meeting / screen capture  
7. Next-to-Next scheduling  

---

## Open choices (for you when ready)

1. Trial length: 7 vs 14 days?  
2. Solo price band to test first: ~$19 or ~$29?  
3. First story on the homepage: creator, CS, or “anyone”?  
4. First connect: calendar-only or calendar + email?

---

*This is a map, not a build ticket. Say when you want this turned into clickable screens (still prototype, no real charges).*
