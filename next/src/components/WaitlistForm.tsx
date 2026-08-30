import { useState, type FormEvent } from 'react'

/** Posts to FormSubmit → owner Gmail. Free, no API key. */
const FORMSUBMIT = 'https://formsubmit.co/ajax/jrivera3989@gmail.com'

export function WaitlistForm({ dark = false }: { dark?: boolean }) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'ok' | 'bad' | 'err' | 'sending'>('idle')

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('bad')
      return
    }
    setStatus('sending')
    try {
      const res = await fetch(FORMSUBMIT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          _subject: 'Next waitlist',
          _template: 'table',
          source: typeof window !== 'undefined' ? window.location.href : 'next',
        }),
      })
      if (!res.ok) throw new Error('submit failed')
      setStatus('ok')
      setEmail('')
    } catch {
      setStatus('err')
    }
  }

  const inputClass = dark
    ? 'h-12 flex-1 rounded-full border border-white/15 bg-white/5 px-5 text-sm text-white placeholder:text-white/35 outline-none focus:border-teal-300/50'
    : 'h-12 flex-1 rounded-full border border-input bg-card/80 px-5 text-sm outline-none focus:border-urgent'

  const btnClass = dark
    ? 'h-12 rounded-full bg-teal-300 px-6 text-sm font-semibold text-[#062018] disabled:opacity-50'
    : 'h-12 rounded-full bg-urgent px-6 text-sm font-semibold text-urgent-foreground disabled:opacity-50'

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
          disabled={status === 'sending'}
        />
        <button type="submit" className={btnClass} disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : 'Join waitlist'}
        </button>
      </form>
      {status === 'ok' ? (
        <p className={dark ? 'mt-3 text-sm text-teal-200/90' : 'mt-3 text-sm text-urgent-foreground'}>
          Got it. We&apos;ll email when there is something to try.
        </p>
      ) : null}
      {status === 'bad' ? (
        <p className={dark ? 'mt-3 text-sm text-rose-300' : 'mt-3 text-sm text-red-700'}>
          Enter a valid email.
        </p>
      ) : null}
      {status === 'err' ? (
        <p className={dark ? 'mt-3 text-sm text-rose-300' : 'mt-3 text-sm text-red-700'}>
          Couldn&apos;t send. Email jrivera3989@gmail.com and we&apos;ll add you.
        </p>
      ) : null}
    </div>
  )
}
