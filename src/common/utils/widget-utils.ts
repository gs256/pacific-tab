import type { WidgetConfig } from '../types'
import { GRID_COLUMNS } from './const'

export function willWrap(index: number, spanX: number) {
  const rowIndex1 = Math.floor(index / GRID_COLUMNS)
  const rowIndex2 = Math.floor((index + spanX - 1) / GRID_COLUMNS)
  return rowIndex1 !== rowIndex2
}

export function isMultiCell(widget: WidgetConfig | null | undefined) {
  const span = widget?.spanX ?? 1
  return span > 1
}

export function isSingleCell(widget: WidgetConfig | null | undefined) {
  const span = widget?.spanX ?? 1
  return span === 1
}

export function span(widget: WidgetConfig | null | undefined) {
  return widget?.spanX ?? 1
}
