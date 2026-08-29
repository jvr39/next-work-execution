# Next — prototype handoff

Interactive prototype of a work execution system that answers one question: **What should I do next?**

Not a to-do app. A click-through of Joe’s day as a CS director — role model, morning briefing, NOW / Next, task workspaces, Approve & send, mid-day replan (Waze), work memory.

## Share this link

**Live prototype:** https://jvr39.github.io/next-work-execution/

Send reviewers that URL. Then:

1. Tap **Enter Joe’s day**  
2. **Start my day** → press **Next** → decide → **Done**  
3. After the first task, accept the Slack interrupt  
4. Peek at **Role** and **Memory** in the header  

~8 minutes. Prototype controls live in the bottom bar (simulate interrupt, jump mid-day, reset).

Repo: https://github.com/jvr39/next-work-execution

## Run locally

```bash
cd next
npm install
npm run dev
```

Open the URL Vite prints (e.g. `http://127.0.0.1:5173`).

## What to notice

| Moment | Why it matters |
| --- | --- |
| Landing → Enter Joe’s day | Instant immersion; onboarding is optional |
| Morning briefing | Plan built from calendar + overnight change |
| Giant **Next** | Killer feature — one button, no dashboard |
| Task workspace | Context + evidence + decision; AI prepares, human approves |
| Slack interrupt | Continuous replan, not a static daily plan |
| Role / Memory | Stakeholder graph + moat — not just inbox triage |
| Day complete | Emotional payoff: critical work cleared |

## Deploy (GitHub Pages)

Repo is set up for Pages from `gh-pages` branch or Actions. After push:

```bash
cd next
npm run build
# static files in dist/ — HashRouter, works on any static host
```

Or: `npx serve dist` for a local share session on the same network.
