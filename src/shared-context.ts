import { createContext, useContext } from 'react'
import type { SharedState } from './shared-state'

export const SharedContext = createContext<SharedState | undefined>(undefined)

export function useSharedContext() {
  const shared = useContext(SharedContext)

  if (!shared) {
    throw new Error('SharedContext is undefined')
  }

  return shared
}
