import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useSharedContext } from './shared-context'
import { cn } from '@/utils/cn'
import { useContextMenuContext } from './context-menu/context-menu-context'
import { isUrl } from './utils/is-url'
import { useToasterContext } from './toaster/toaster-context'

export function Placeholder(props: { index: number }) {
  const sharedContext = useSharedContext()
  const value = sharedContext.items.at(props.index) ?? ''
  const [iconLoading, setIconLoading] = useState(false)
  const [highlighted, setHighlighted] = useState(false)
  const contextMenu = useContextMenuContext()
  const toaster = useToasterContext()
  const ref = useRef(null)

  const valueIsUrl = useMemo(() => isUrl(value), [value])

  const url = useMemo<URL | null>(() => {
    try {
      return new URL(value)
    } catch {
      return null
    }
  }, [value])

  const faviconUrl = url
    ? `https://icons.duckduckgo.com/ip2/${url.hostname}.ico`
    : ''

  const firstLetter = (url?.host.at(0) ?? '').toUpperCase()

  const handleClick = () => {
    if (valueIsUrl) {
      window.open(value)
    }
  }

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

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('text/plain', value)
    sharedContext.setDragData({ index: props.index, value })
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const dragData = sharedContext.dragData
    if (dragData) {
      sharedContext.swapValues(props.index, dragData.index)
    } else {
      const dropped = e.dataTransfer?.getData('text/plain')
      if (Boolean(dropped) && dropped.startsWith('http')) {
        sharedContext.setUrl(props.index, dropped)
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
        { id: 'delete', label: 'Delete', className: 'text-red-400' },
      ],
      onClick: (id: string) => {
        if (id === 'paste') {
          window.navigator.clipboard.readText().then((text) => {
            if (isUrl(text)) {
              sharedContext.setUrl(props.index, text)
            } else {
              toaster.show({ text: 'Not a valid url', severity: 'error' })
            }
          })
        }
        if (id === 'delete') {
          sharedContext.setUrl(props.index, '')
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
      data-tip={value}
      onContextMenu={openContextMenu}
      className={cn(
        'card card-border bg-base-300 w-17 h-17 text-center items-center justify-center select-none cursor-pointer',
        highlighted && 'bg-emerald-900',
        !sharedContext.dragData && 'tooltip',
      )}
      onClick={handleClick}
    >
      {value && (
        <div
          ref={ref}
          onDragStart={handleDragStart}
          className="rounded-full w-12 h-12 bg-gray-800 flex items-center justify-center"
          draggable
        >
          {valueIsUrl ? (
            <>
              <FaviconImg
                key={faviconUrl}
                src={faviconUrl}
                setLoading={setIconLoading}
              />
              {iconLoading && <div className="absolute">{firstLetter}</div>}
            </>
          ) : (
            <>{firstLetter}</>
          )}
        </div>
      )}
    </div>
  )
}

function FaviconImg(props: {
  src: string
  setLoading: (isLoading: boolean) => void
}) {
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>(
    'loading',
  )

  useEffect(() => {
    props.setLoading(status === 'loading')
  }, [props, status])

  return (
    <img
      src={props.src}
      alt="favicon"
      onLoad={() => setStatus('loaded')}
      onError={() => setStatus('error')}
      className={cn(
        'w-7 h-7 pointer-events-none',
        status !== 'loaded' && 'invisible',
      )}
    />
  )
}
