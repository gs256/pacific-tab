import { useEffect, useState } from 'react'
import { useDebounce } from './utils/use-debounce'

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

function defaultItems() {
  return ['', '', '']
}

function loadItems() {
  const data = localStorage.getItem('items')
  if (!data) {
    return defaultItems()
  }
  const items: string[] = JSON.parse(data)
  if (!Array.isArray(items)) {
    return defaultItems()
  }
  return items
}

export function useSharedState() {
  const [items, setItems] = useState<string[]>(loadItems())
  const [dragData, setDragData] = useState<SharedState['dragData'] | null>(null)

  const setUrl = (index: number, url: string) => {
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

  const saveItemsToLocalStorage = useDebounce(() => {
    localStorage.setItem('items', JSON.stringify(items))
  }, 200)

  useEffect(() => {
    saveItemsToLocalStorage()
  }, [items, saveItemsToLocalStorage])

  return {
    items: items,
    setUrl,
    dragData,
    setDragData,
    swapValues,
  } satisfies SharedState
}
