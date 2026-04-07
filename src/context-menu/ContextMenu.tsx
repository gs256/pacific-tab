import React, { useEffect, useState } from 'react'
import {
  ContextMenuContext,
  type ContextMenuContextType,
} from './context-menu-context'

export function ContextMenu(props: { children?: React.ReactNode }) {
  const [contextMenu, setContextMenu] = useState<{
    x: number
    y: number
  } | null>(null)

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault()
    setContextMenu({ x: e.clientX, y: e.clientY })
  }

  useEffect(() => {
    const close = () => setContextMenu(null)
    window.addEventListener('click', () => close())
    window.addEventListener('keydown', (e) => e.key === 'Escape' && close())
    return () => window.removeEventListener('click', close)
  }, [])

  const context: ContextMenuContextType = {
    onClick: handleContextMenu,
  }

  return (
    <ContextMenuContext.Provider value={context}>
      {props.children}
      {contextMenu && (
        <ul
          className="menu bg-base-200 rounded-box w-56 fixed z-5"
          style={{ top: contextMenu.y, left: contextMenu.x }}
        >
          <li>
            <a>Item 1</a>
          </li>
          <li>
            <a>Item 2</a>
          </li>
          <li>
            <a>Item 3</a>
          </li>
        </ul>
      )}
    </ContextMenuContext.Provider>
  )
}
