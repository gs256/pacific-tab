import { useSharedStore } from '@/shared-state/shared-state'
import type { PropsWithChildren } from 'react'

export function WidgetWrapper(
  props: { index: number; value: string } & PropsWithChildren,
) {
  const sharedContext = useSharedStore()

  const handleDragStart = () => {
    sharedContext.setDragData({ index: props.index, value: props.value })
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
    >
      {props.children}
    </div>
  )
}
