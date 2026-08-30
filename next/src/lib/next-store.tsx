import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  actionsById,
  defaultOrder,
  interruptEvent,
  type Action,
} from './next-data'

const KEY = 'next.state.v3'

export type NextState = {
  seenLanding: boolean
  onboarded: boolean
  dayStarted: boolean
  order: string[]
  completed: string[]
  replanApplied: boolean
  interruptOpen: boolean
  justAdvanced: boolean
  coachDismissed: boolean
  decisions: Record<string, string>
}

const initial: NextState = {
  seenLanding: false,
  onboarded: false,
  dayStarted: false,
  order: [...defaultOrder],
  completed: [],
  replanApplied: false,
  interruptOpen: false,
  justAdvanced: false,
  coachDismissed: false,
  decisions: {},
}

function read(): NextState {
  try {
    const raw = window.localStorage.getItem(KEY)
    if (!raw) return initial
    const parsed = JSON.parse(raw) as Partial<NextState>
    return {
      ...initial,
      ...parsed,
      order: parsed.order?.length ? parsed.order : [...defaultOrder],
      completed: parsed.completed ?? [],
      decisions: parsed.decisions ?? {},
      justAdvanced: false,
      interruptOpen: false,
    }
  } catch {
    return initial
  }
}

function persist(next: NextState) {
  try {
    const { justAdvanced: _j, interruptOpen: _i, ...rest } = next
    window.localStorage.setItem(KEY, JSON.stringify(rest))
  } catch {
    /* ignore */
  }
}

type NextContextValue = {
  state: NextState
  hydrated: boolean
  current: Action | null
  upcoming: Action[]
  dayComplete: boolean
  progress: { done: number; total: number }
  update: (patch: Partial<NextState>) => void
  completeAction: (id: string, decisionId?: string) => void
  skipAction: () => void
  clearHandoff: () => void
  openInterrupt: () => void
  applyReplan: () => void
  dismissInterrupt: () => void
  enterDemo: () => void
  enterMidday: () => void
  resetDemo: () => void
}

const NextContext = createContext<NextContextValue | null>(null)

export function NextProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<NextState>(initial)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setState(read())
    setHydrated(true)
  }, [])

  const update = useCallback((patch: Partial<NextState>) => {
    setState((prev) => {
      const next = { ...prev, ...patch }
      persist(next)
      return next
    })
  }, [])

  const completeAction = useCallback((id: string, decisionId?: string) => {
    setState((prev) => {
      const completed = prev.completed.includes(id) ? prev.completed : [...prev.completed, id]
      const next: NextState = {
        ...prev,
        completed,
        decisions: decisionId
          ? { ...prev.decisions, [id]: decisionId }
          : prev.decisions,
        justAdvanced: true,
        // Offer the Waze moment after the first completion if not yet shown
        interruptOpen:
          !prev.replanApplied && completed.length === 1 ? true : prev.interruptOpen,
      }
      persist(next)
      return next
    })
  }, [])

  const skipAction = useCallback(() => {
    setState((prev) => {
      const completedSet = new Set(prev.completed)
      const incomplete = prev.order.filter((id) => !completedSet.has(id))
      if (incomplete.length < 2) return prev
      const [first, ...tail] = incomplete
      const next: NextState = {
        ...prev,
        order: [...prev.order.filter((id) => completedSet.has(id)), ...tail, first!],
        justAdvanced: true,
      }
      persist(next)
      return next
    })
  }, [])

  const clearHandoff = useCallback(() => {
    setState((prev) => ({ ...prev, justAdvanced: false }))
  }, [])

  const openInterrupt = useCallback(() => {
    setState((prev) => ({ ...prev, interruptOpen: true }))
  }, [])

  const applyReplan = useCallback(() => {
    setState((prev) => {
      const completedSet = new Set(prev.completed)
      // New work from the interrupt (e.g. save plan) must enter the route even if
      // it was not in the morning order.
      const preferred = interruptEvent.newOrder.filter((id) => !completedSet.has(id))
      const leftovers = prev.order.filter(
        (id) => !completedSet.has(id) && !preferred.includes(id),
      )
      const next: NextState = {
        ...prev,
        order: [
          ...prev.order.filter((id) => completedSet.has(id)),
          ...preferred,
          ...leftovers,
        ],
        replanApplied: true,
        interruptOpen: false,
        justAdvanced: true,
      }
      persist(next)
      return next
    })
  }, [])

  const dismissInterrupt = useCallback(() => {
    setState((prev) => {
      const next = { ...prev, interruptOpen: false, replanApplied: true }
      persist(next)
      return next
    })
  }, [])

  const enterDemo = useCallback(() => {
    const next: NextState = {
      ...initial,
      seenLanding: true,
      onboarded: true,
      dayStarted: true,
      coachDismissed: false,
    }
    persist(next)
    setState(next)
  }, [])

  const enterMidday = useCallback(() => {
    const next: NextState = {
      ...initial,
      seenLanding: true,
      onboarded: true,
      dayStarted: true,
      completed: ['acme-renewal-risk', 'globex-qbr-followup'],
      order: [...defaultOrder],
      coachDismissed: true,
      decisions: {
        'acme-renewal-risk': 'escalate',
        'globex-qbr-followup': 'approve',
      },
    }
    persist(next)
    setState({ ...next, justAdvanced: true })
  }, [])

  const resetDemo = useCallback(() => {
    try {
      window.localStorage.removeItem(KEY)
      window.localStorage.removeItem('next.state.v1')
    } catch {
      /* ignore */
    }
    setState(initial)
  }, [])

  const pendingIds = state.order.filter((id) => !state.completed.includes(id))
  const current = pendingIds[0] ? actionsById[pendingIds[0]] ?? null : null
  const upcoming = pendingIds
    .slice(1)
    .map((id) => actionsById[id])
    .filter(Boolean) as Action[]
  const dayComplete = state.dayStarted && pendingIds.length === 0
  const progress = {
    done: state.completed.length,
    total: state.order.length,
  }

  const value = useMemo(
    () => ({
      state,
      hydrated,
      current,
      upcoming,
      dayComplete,
      progress,
      update,
      completeAction,
      skipAction,
      clearHandoff,
      openInterrupt,
      applyReplan,
      dismissInterrupt,
      enterDemo,
      enterMidday,
      resetDemo,
    }),
    [
      state,
      hydrated,
      current,
      upcoming,
      dayComplete,
      progress,
      update,
      completeAction,
      skipAction,
      clearHandoff,
      openInterrupt,
      applyReplan,
      dismissInterrupt,
      enterDemo,
      enterMidday,
      resetDemo,
    ],
  )

  return <NextContext.Provider value={value}>{children}</NextContext.Provider>
}

export function useNext() {
  const ctx = useContext(NextContext)
  if (!ctx) throw new Error('useNext must be used within NextProvider')
  return ctx
}
