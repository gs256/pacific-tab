import { createContext, useContext, useState } from 'react'

export interface SharedState {
  items: string[]
  dragData: {
    index: number
    value: string
  } | null

  setUrl(index: number, url: string): void
  setDragData(dragData: SharedState['dragData']): void
  swapValues(index1: number, index2: number): void
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
  const [dragData, setDragData] = useState<SharedState['dragData'] | null>(null)

  function setUrl(index: number, url: string) {
    setItems(items.map((item, i) => (i === index ? url : item)))
  }

  const swapValues = (index1: number, index2: number) => {
    const value1 = items[index1]
    const value2 = items[index2]
    setItems(
      items.map((item, i) => {
        if (i === index1) return value2
        if (i === index2) return value1
        return item
      }),
    )
  }

  return {
    items: items,
    setUrl,
    dragData,
    setDragData,
    swapValues,
  } satisfies SharedState
}
