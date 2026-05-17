import { cn } from '@/common/utils/cn'
import { useSharedStore } from '@/shared-state/shared-state'
import { ClockWidget } from '@/widget-grid/ClockWidget'
import { useState, type CSSProperties, type PropsWithChildren } from 'react'

export function WidgetDrawer(
  props: PropsWithChildren & { className?: string; style: CSSProperties },
) {
  const [open, setOpen] = useState(false)
  const { dragData } = useSharedStore()

  if (dragData && open) {
    setOpen(false)
  }

  return (
    <div className={cn('drawer', props.className)} style={props.style}>
      <input
        id="my-drawer-1"
        type="checkbox"
        className="drawer-toggle"
        checked={open}
        onChange={(e) => setOpen(e.target.checked)}
      />
      <div className="drawer-content">
        {props.children}
        <label htmlFor="my-drawer-1" className="btn drawer-button">
          Open drawer
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-1"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="bg-base-200 min-h-full w-80 p-4 flex flex-col items-center justify-center">
          <DrawerItem placeholderClass="h-17 w-36" text="Clock 2x1">
            <ClockWidget index={0} variant="spawner" />
          </DrawerItem>
        </div>
      </div>
    </div>
  )
}

function DrawerItem(
  props: { placeholderClass?: string; text: string } & PropsWithChildren,
) {
  return (
    <div className="drawer-item flex flex-col items-center gap-1">
      <div className={cn('bg-base-300 rounded-lg', props.placeholderClass)}>
        {props.children}
      </div>
      <p className="font-light">{props.text}</p>
    </div>
  )
}
