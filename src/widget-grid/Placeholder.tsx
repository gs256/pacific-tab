import React, { useState } from 'react'
import { useSharedContext } from '../shared-state/shared-context'
import { cn } from '@/common/utils/cn'
import { useContextMenuContext } from '../context-menu/context-menu-context'
import { isUrl } from '../common/utils/is-url'
import { useToasterContext } from '../toaster/toaster-context'
import { PlaceholderContext } from './placeholder-context'
import type { WidgetConfig } from '@/shared-state/shared-state'
import { BookmarkWidget } from './BookmarkWidget'
import { ClockWidget } from './ClockWidget'

export function Placeholder(props: {
  index: number
  widget: WidgetConfig | null
}) {
  const sharedContext = useSharedContext()
  const [highlighted, setHighlighted] = useState(false)
  const contextMenu = useContextMenuContext()
  const toaster = useToasterContext()
  const [tooltip, setTooltip] = useState('')

  const hasWidget = Boolean(props.widget)

  const handleDragEnter = () => {
    const dragData = sharedContext.dragData
    if (dragData && dragData.index !== props.index) {
      setHighlighted(true)
    }
  }

  const handleDragExit = (e: React.DragEvent) => {
    if (e.currentTarget.contains(e.relatedTarget as Node)) return
    setHighlighted(false)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const dragData = sharedContext.dragData
    if (dragData) {
      sharedContext.swapValues(props.index, dragData.index)
    } else {
      const dropped = e.dataTransfer?.getData('text/plain')
      if (isUrl(dropped)) {
        sharedContext.setWidget(props.index, { type: 'url', data: dropped })
      }
    }
    sharedContext.setDragData(null)
    setHighlighted(false)
  }

  const openContextMenu = (event: React.MouseEvent) => {
    contextMenu.open({
      event,
      items: [
        { id: 'paste', label: 'Paste' },
        {
          id: 'delete',
          label: 'Delete',
          className: hasWidget ? 'text-red-400' : '',
          disabled: !hasWidget,
        },
      ],
      onClick: (id: string) => {
        if (id === 'paste') {
          window.navigator.clipboard.readText().then((text) => {
            if (isUrl(text)) {
              sharedContext.setWidget(props.index, {
                type: 'url',
                data: text,
              })
            } else {
              toaster.show({ text: 'Not a valid URL', severity: 'error' })
            }
          })
        }
        if (id === 'delete') {
          sharedContext.setWidget(props.index, null)
        }
      },
    })
  }

  return (
    <div
      onDrop={handleDrop}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragExit}
      onDragOver={handleDragOver}
      onContextMenu={openContextMenu}
      className={cn(
        'card card-border bg-base-300 min-w-17 min-h-17 text-center items-center justify-center select-none cursor-pointer',
        highlighted && 'bg-emerald-900',
        !sharedContext.dragData && 'tooltip',
        sharedContext.isCollapsed(props.index) && 'hidden',
      )}
      data-tip={tooltip}
      style={
        props.widget?.spanX
          ? {
              gridColumnEnd: `span ${props.widget.spanX}`,
            }
          : {}
      }
    >
      <PlaceholderContext.Provider value={{ setTooltip }}>
        {props.widget?.type === 'url' && (
          <BookmarkWidget index={props.index} value={props.widget.data} />
        )}
        {props.widget?.type === 'clock' && <ClockWidget index={props.index} />}
      </PlaceholderContext.Provider>
      <div className="absolute top-0 left-0">{props.index}</div>
    </div>
  )
}
