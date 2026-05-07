import type { WidgetConfig, WidgetVariant } from '@/common/types'
import { cn } from '@/common/utils/cn'
import { useSharedStore } from '@/shared-state/shared-state'
import type { PropsWithChildren } from 'react'

export function WidgetWrapper(
  props: {
    index: number
    className?: string
    variant: WidgetVariant
  } & PropsWithChildren &
    WidgetConfig,
) {
  const { setDragData, setWidget } = useSharedStore()

  const handleDragStart = () => {
    setDragData({ index: props.index, widget: { ...props } })
    setWidget(props.index, null)
  }

  const handleDragEnd = () => {}

  const handleDrag = () => {}

  return (
    <div
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDrag={handleDrag}
      draggable
      className={cn('flex', props.className)}
    >
      {props.children}
    </div>
  )
}
