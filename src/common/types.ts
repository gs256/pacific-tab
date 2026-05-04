export type WidgetType = 'url' | 'clock'

export interface WidgetConfig {
  type: WidgetType
  data: string
  spanX?: number
}

export interface DragData {
  index: number
  widget: WidgetConfig
}
