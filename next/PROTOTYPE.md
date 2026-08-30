# Next — prototype handoff

Interactive prototype of a work execution system that answers one question: **What should I do next?**

A click-through of Joe’s day as a CS director — one Next, task workspace, Approve & send, then **The Waze moment**.

## Share this link

**Live prototype:** https://jvr39.github.io/next-work-execution/

**VC pitch deck:** https://jvr39.github.io/next-work-execution/#/pitch

**CS vision deck:** https://jvr39.github.io/next-work-execution/#/vision

1. Tap **Enter Joe’s day**
2. **Start** → decide → **Done**
3. After the first task, tap **The Waze moment** in the bottom bar

~6 minutes. That interrupt is the product.

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
| Landing → Enter Joe’s day | Instant immersion |
| Giant **Start** | One Next — no dashboard, no list |
| Task workspace | Context + evidence + decision; AI prepares, human approves |
| The Waze moment | Continuous replan, not a static daily plan |
| Day complete | Critical work cleared — not inbox zero |

## Deploy (GitHub Pages)

```bash
cd next
VITE_BASE=/next-work-execution/ npm run build
npx gh-pages -d dist
```
