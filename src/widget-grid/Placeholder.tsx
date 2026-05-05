import React, { useState } from 'react'
import { cn } from '@/common/utils/cn'
import { useContextMenuContext } from '../context-menu/context-menu-context'
import { isUrl } from '../common/utils/is-url'
import { useToasterContext } from '../toaster/toaster-context'
import { PlaceholderContext } from './placeholder-context'
import { useSharedStore } from '@/shared-state/shared-state'
import { BookmarkWidget } from './BookmarkWidget'
import { ClockWidget } from './ClockWidget'
import type { WidgetConfig } from '@/common/types'

export function Placeholder(props: {
  index: number
  widget: WidgetConfig | null
}) {
  const {
    dragData,
    setWidget,
    handleDrop,
    isCollapsed,
    handleMouseEnter,
    handleMouseLeave,
    highlight,
  } = useSharedStore()
  const contextMenu = useContextMenuContext()
  const toaster = useToasterContext()
  const [tooltip, setTooltip] = useState('')

  const highlighted = highlight?.cells.includes(props.index) ?? false
  const hasWidget = Boolean(props.widget)

  const onMouseEnter = () => {
    handleMouseEnter(props.index)
  }

  const onMouseLeave = () => {
    handleMouseLeave(props.index)
  }

  // const handleDragEnter = () => {
  //   if (dragData && dragData.index !== props.index) {
  //     setHighlighted(true)
  //   }
  // }

  // const handleDragExit = (e: React.DragEvent) => {
  //   if (e.currentTarget.contains(e.relatedTarget as Node)) return
  //   setHighlighted(false)
  // }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const dropped = e.dataTransfer?.getData('text/plain')
    if (isUrl(dropped)) {
      setWidget(props.index, { type: 'url', data: dropped })
    } else {
      handleDrop(props.index)
    }
  }

  const handleMouseUp = (e: React.MouseEvent) => {
    e.stopPropagation()
    handleDrop(props.index)
  }

  const openContextMenu = (event: React.MouseEvent) => {
    if (event.altKey || event.ctrlKey) {
      return
    }
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
              setWidget(props.index, {
                type: 'url',
                data: text,
              })
            } else {
              toaster.show({ text: 'Not a valid URL', severity: 'error' })
            }
          })
        }
        if (id === 'delete') {
          setWidget(props.index, null)
        }
      },
    })
  }

  return (
    <div
      onDrop={onDrop}
      onMouseUp={handleMouseUp}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onDragOver={handleDragOver}
      onContextMenu={openContextMenu}
      className={cn(
        'flex card card-border bg-base-300 min-w-17 min-h-17 text-center items-center justify-center select-none cursor-pointer',
        highlighted && 'bg-emerald-900',
        !dragData && 'tooltip',
        isCollapsed(props.index) && 'hidden',
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
    </div>
  )
}
