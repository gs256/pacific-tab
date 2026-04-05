import { createContext, useContext, useState } from 'react'

export interface SharedState {
  items: string[]
  setUrl: (index: number, url: string) => void
}

export const SharedContext = createContext<SharedState | undefined>(undefined)

export function useSharedContext() {
  const shared = useContext(SharedContext)

  if (!shared) {
    throw new Error('SharedContext is undefined')
  }

  return shared
}

export function useSharedState() {
  const [items, setItems] = useState<string[]>(['', '', ''])

  function setUrl(index: number, url: string) {
    setItems(items.map((item, i) => (i === index ? url : item)))
  }

  return {
    items: items,
    setUrl,
  } satisfies SharedState
}
