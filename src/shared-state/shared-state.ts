import { useEffect } from 'react'
import { useDebounce } from '../common/utils/use-debounce'
import { GRID_COLUMNS, GRID_ROWS } from '../common/utils/const'
import { create } from 'zustand'

export type WidgetType = 'url' | 'clock'

export interface WidgetConfig {
  type: WidgetType
  data: string
  spanX?: number
}

function defaultItems(): Array<WidgetConfig | null> {
  return Array(GRID_ROWS * GRID_COLUMNS).fill(null)
}

function loadItems() {
  const data = localStorage.getItem('items')
  if (!data) {
    return defaultItems()
  }
  const items: Array<WidgetConfig | null> = JSON.parse(data)
  if (!Array.isArray(items) || items.length !== defaultItems().length) {
    return defaultItems()
  }
  return items
}

export interface DragData {
  index: number
  widget: WidgetConfig
}

export interface SharedState {
  items: Array<WidgetConfig | null>
  dragData: DragData | null

  setDragData(dragData: SharedState['dragData']): void
  swapValues(index1: number, index2: number): void
  setWidget(index: number, widget: WidgetConfig | null): void
  isCollapsed(index: number): boolean

  handleDrop(index: number | undefined): void
}

export const useSharedStore = create<SharedState>((set, state) => ({
  items: loadItems(),
  dragData: null,

  setDragData: (dragData: SharedState['dragData']) => {
    set(() => ({ dragData }))
  },

  swapValues: (index1: number, index2: number) => {
    const value1 = state().items[index1]
    const value2 = state().items[index2]
    set((state) => ({
      items: state.items.map((item, i) => {
        if (i === index1) return value2
        if (i === index2) return value1
        return item
      }),
    }))
  },

  setWidget: (index: number, widget: WidgetConfig | null) => {
    set((state) => ({
      items: state.items.map((item, i) => (i === index ? widget : item)),
    }))
  },

  isCollapsed: (index: number) => {
    const rowIndex = Math.floor(index / GRID_COLUMNS)
    const iMin = GRID_COLUMNS * rowIndex
    const prevItem = state().items.at(index - 1)
    if (index > iMin && prevItem?.spanX && prevItem.spanX > 1) {
      return true
    }
    return false
  },

  handleDrop: (index?: number) => {
    const s = state()
    const dragData = s.dragData

    const span = (widget?: WidgetConfig) => {
      return widget ? (widget.spanX ?? 1) : 0
    }

    const willWrap = (index: number, spanX: number) => {
      const rowIndex1 = Math.floor(index / GRID_COLUMNS)
      const rowIndex2 = Math.floor((index + spanX - 1) / GRID_COLUMNS)
      return rowIndex1 !== rowIndex2
    }

    const canPlace = () => {
      if (index === undefined) return true
      if (s.items[index]?.spanX) return false
      const spanX = span(dragData?.widget)
      if (spanX > 1) {
        if (s.items.at(index)) return false
        if (s.items.at(index + 1)) return false // FIXME (if spanX > 2)
        if (willWrap(index, spanX)) return false
      }
      return true
    }

    if (dragData) {
      if (index === undefined) {
        s.setWidget(dragData.index, dragData?.widget)
      } else {
        if (canPlace()) {
          s.setWidget(dragData.index, s.items[index])
          s.setWidget(index, dragData.widget)
        } else {
          s.setWidget(dragData.index, dragData?.widget)
        }
      }
    }
    s.setDragData(null)
  },
}))

export function useSharedState() {
  const { items } = useSharedStore()

  const saveItemsToLocalStorage = useDebounce(() => {
    localStorage.setItem('items', JSON.stringify(items))
  }, 200)

  useEffect(() => {
    saveItemsToLocalStorage()
  }, [items, saveItemsToLocalStorage])
}
