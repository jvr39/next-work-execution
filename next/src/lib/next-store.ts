import { useCallback, useEffect, useState } from 'react'
import { queue } from './next-data'

const KEY = 'next.state.v1'

export type NextState = {
  onboarded: boolean
  queueIndex: number
  completed: string[]
  justAdvanced: boolean
}

const initial: NextState = {
  onboarded: false,
  queueIndex: 0,
  completed: [],
  justAdvanced: false,
}

function read(): NextState {
  try {
    const raw = window.localStorage.getItem(KEY)
    if (!raw) return initial
    return { ...initial, ...(JSON.parse(raw) as Partial<NextState>), justAdvanced: false }
  } catch {
    return initial
  }
}

function persist(next: NextState) {
  try {
    const { justAdvanced: _, ...rest } = next
    window.localStorage.setItem(KEY, JSON.stringify(rest))
  } catch {
    /* ignore */
  }
}

export function useNextState() {
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

  const completeAction = useCallback((id: string) => {
    setState((prev) => {
      const next: NextState = {
        ...prev,
        completed: prev.completed.includes(id) ? prev.completed : [...prev.completed, id],
        queueIndex: (prev.queueIndex + 1) % queue.length,
        justAdvanced: true,
      }
      persist(next)
      return next
    })
  }, [])

  const advance = useCallback(() => {
    setState((prev) => {
      const next: NextState = {
        ...prev,
        queueIndex: (prev.queueIndex + 1) % queue.length,
        justAdvanced: true,
      }
      persist(next)
      return next
    })
  }, [])

  const clearHandoff = useCallback(() => {
    setState((prev) => ({ ...prev, justAdvanced: false }))
  }, [])

  const reset = useCallback(() => {
    try {
      window.localStorage.removeItem(KEY)
    } catch {
      /* ignore */
    }
    setState(initial)
  }, [])

  return { state, hydrated, update, completeAction, advance, clearHandoff, reset }
}

export function currentAction(index: number) {
  return queue[index % queue.length]
}

export function remainingQueue(index: number, completed: string[]) {
  return queue.filter((action, i) => i !== index % queue.length && !completed.includes(action.id))
}
