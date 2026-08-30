import { useState, type FormEvent } from 'react'

const KEY = 'next.waitlist.v1'

function readList(): string[] {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as string[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function saveEmail(email: string) {
  const list = readList()
  const normalized = email.trim().toLowerCase()
  if (!normalized || list.includes(normalized)) return list.length
  const next = [...list, normalized]
  localStorage.setItem(KEY, JSON.stringify(next))
  return next.length
}

/** Local prototype waitlist — replace with real backend before real launch */
export function WaitlistForm({ dark = false }: { dark?: boolean }) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'ok' | 'bad'>('idle')

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('bad')
      return
    }
    saveEmail(email)
    setStatus('ok')
    setEmail('')
  }

  const inputClass = dark
    ? 'h-12 flex-1 rounded-full border border-white/15 bg-white/5 px-5 text-sm text-white placeholder:text-white/35 outline-none focus:border-teal-300/50'
    : 'h-12 flex-1 rounded-full border border-input bg-card/80 px-5 text-sm outline-none focus:border-urgent'

  const btnClass = dark
    ? 'h-12 rounded-full bg-teal-300 px-6 text-sm font-semibold text-[#062018]'
    : 'h-12 rounded-full bg-urgent px-6 text-sm font-semibold text-urgent-foreground'

  return (
    <div className="w-full max-w-md">
      <form onSubmit={onSubmit} className="flex flex-col gap-3 sm:flex-row">
        <input
          type="email"
          name="email"
          autoComplete="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            setStatus('idle')
          }}
          placeholder="you@company.com"
          className={inputClass}
          aria-label="Email for waitlist"
        />
        <button type="submit" className={btnClass}>
          Join waitlist
        </button>
      </form>
      {status === 'ok' ? (
        <p className={dark ? 'mt-3 text-sm text-teal-200/90' : 'mt-3 text-sm text-urgent-foreground'}>
          You&apos;re on the list. We&apos;ll email when there is something to try.
        </p>
      ) : null}
      {status === 'bad' ? (
        <p className={dark ? 'mt-3 text-sm text-rose-300' : 'mt-3 text-sm text-red-700'}>
          Enter a valid email.
        </p>
      ) : null}
    </div>
  )
}
