import { useEffect } from 'react'
import { useDebounce } from '../common/utils/use-debounce'
import { GRID_COLUMNS, GRID_ROWS } from '../common/utils/const'
import { create } from 'zustand'
import type { DragData, WidgetConfig } from '@/common/types'
import { loadItems } from '@/common/utils/utils'
import { isSingleCell, span, willWrap } from '@/common/utils/widget-utils'

export interface SharedState {
  items: Array<WidgetConfig | null>
  dragData: DragData | null
  highlight: {
    cells: number[]
    color: 'green' | 'red'
  } | null

  setDragData(dragData: DragData | null): void
  setWidget(index: number, widget: WidgetConfig | null): void
  isCollapsed(index: number): boolean
  handleDrop(index: number | undefined): void
  handleMouseEnter(index: number): void
  handleMouseLeave(): void
  importItems(items: string): void
  exportItems(): string
}

export const useSharedStore = create<SharedState>((set, state) => ({
  items: loadItems(),
  dragData: null,
  highlight: null,

  setDragData: (dragData: DragData | null) => {
    set(() => ({ dragData }))
    if (!dragData) {
      set(() => ({ highlight: null }))
    }
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

  handleMouseEnter: (index: number) => {
    const dragData = state().dragData
    const items = state().items

    const affectedIndices = () => {
      if (!dragData?.widget.spanX || dragData?.widget.spanX === 1) {
        return [index]
      }
      // FIXME
      if (dragData.widget.spanX === 2) {
        if (willWrap(index, 2)) {
          return [index]
        } else {
          return [index, index + 1]
        }
      }
      return []
    }

    const affectedCells = affectedIndices()

    const canDrop = isSingleCell(dragData?.widget)
      ? isSingleCell(items[index])
      : affectedCells.length === span(dragData?.widget) &&
        affectedCells.every((i) => items[i] === null)

    if (dragData) {
      set(() => ({
        highlight: {
          cells: affectedCells,
          color: canDrop ? 'green' : 'red',
        },
      }))
    }
  },

  handleMouseLeave: () => {
    set(() => ({ highlight: null }))
  },

  handleDrop: (index: number | undefined) => {
    const s = state()
    const dragData = s.dragData

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
        if (dragData.index !== undefined) {
          s.setWidget(dragData.index, dragData?.widget)
        }
      } else {
        if (canPlace()) {
          if (dragData.index !== undefined) {
            s.setWidget(dragData.index, s.items[index])
          }
          s.setWidget(index, dragData.widget)
        } else {
          if (dragData.index !== undefined) {
            s.setWidget(dragData.index, dragData?.widget)
          }
        }
      }
    }
    s.setDragData(null)
  },

  importItems: (items: string) => {
    const data = JSON.parse(items) as Array<WidgetConfig | null>
    if (!Array.isArray(data)) {
      return
    }
    if (data.length !== GRID_ROWS * GRID_COLUMNS) {
      return
    }
    set({ items: data })
  },

  exportItems: () => {
    const items = state().items
    const data = JSON.stringify(items)
    navigator.clipboard.writeText(data)
    return data
  },
}))

export function useSharedState() {
  const { items } = useSharedStore()

  const saveItemsToLocalStorage = useDebounce(() => {
    localStorage.setItem('items', JSON.stringify(items))
  }, 100)

  useEffect(() => {
    saveItemsToLocalStorage()
  }, [items, saveItemsToLocalStorage])
}
