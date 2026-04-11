import React, { useEffect, useRef, useState } from 'react'
import {
  ContextMenuContext,
  type ContextMenuContextType,
  type ContextMenuItem,
} from './context-menu-context'
import { cn } from '@/common/utils/cn'

export function ContextMenu(props: { children?: React.ReactNode }) {
  const [contextMenu, setContextMenu] = useState<{
    x: number
    y: number
  } | null>(null)
  const [items, setItems] = useState<ContextMenuItem[]>([])
  const selectCallback = useRef<(id: string) => void | null>(null)

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault()
    setContextMenu({ x: e.clientX, y: e.clientY })
  }

  useEffect(() => {
    const close = () => setContextMenu(null)
    window.addEventListener('click', () => close())
    window.addEventListener('keydown', (e) => e.key === 'Escape' && close())

    return () => {
      window.removeEventListener('click', close)
      selectCallback.current = null
    }
  }, [])

  const context: ContextMenuContextType = {
    open: (params) => {
      selectCallback.current = params.onClick
      setItems(params.items)
      handleContextMenu(params.event)
    },
  }

  return (
    <ContextMenuContext.Provider value={context}>
      {props.children}
      {contextMenu && (
        <ul
          className="menu bg-base-200 rounded-box w-56 fixed z-5"
          style={{ top: contextMenu.y, left: contextMenu.x }}
        >
          {items.map((item) => (
            <li
              key={item.id}
              className={cn(
                item.className,
                item.disabled === true && 'menu-disabled',
              )}
            >
              <a
                onClick={() => selectCallback.current?.(item.id)}
                aria-disabled={item.disabled === true}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </ContextMenuContext.Provider>
  )
}
