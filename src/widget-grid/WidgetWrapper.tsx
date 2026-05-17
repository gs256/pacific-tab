import type { WidgetConfig, WidgetVariant } from '@/common/types'
import { cn } from '@/common/utils/cn'
import { useSharedStore } from '@/shared-state/shared-state'
import type { PropsWithChildren } from 'react'

export function WidgetWrapper(
  props: {
    index: number
    className?: string
    variant: WidgetVariant
    config: WidgetConfig
  } & PropsWithChildren,
) {
  const { setDragData, setWidget } = useSharedStore()

  const handleDragStart = () => {
    setDragData({ index: props.index, widget: props.config })
    if (props.variant !== 'spawner') {
      setWidget(props.index, null)
    }
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
