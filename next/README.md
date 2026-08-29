# Next

A work execution system that answers one question: **What should I do next?**

## Run

```bash
cd next
npm install
npm run dev
```

Open the local URL Vite prints (usually `http://localhost:5173`).

## Flow

1. **Teach Me My Job** (`/onboarding`) — role model interview
2. **Morning briefing** (`/morning`) — drafted day
3. **Home** (`/`) — NOW + giant **Next** button + Up next
4. **Task workspace** (`/task/:id`) — context, evidence, decisions, Done → next

Mock data is for a CS director (Joe). Progress persists in `localStorage`.
