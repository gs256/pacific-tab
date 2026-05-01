import { cn } from '@/common/utils/cn'
import { useSharedStore, type WidgetConfig } from '@/shared-state/shared-state'
import type { PropsWithChildren } from 'react'

export function WidgetWrapper(
  props: { index: number; className?: string } & PropsWithChildren &
    WidgetConfig,
) {
  const sharedContext = useSharedStore()

  const handleDragStart = () => {
    sharedContext.setDragData({ index: props.index, widget: { ...props } })
    sharedContext.setWidget(props.index, null)
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
