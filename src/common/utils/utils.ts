import type { WidgetConfig } from '../types'
import { GRID_ROWS, GRID_COLUMNS } from './const'

export function defaultItems(): Array<WidgetConfig | null> {
  return Array(GRID_ROWS * GRID_COLUMNS).fill(null)
}

export function loadItems() {
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
