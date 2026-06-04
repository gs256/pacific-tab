import React, { useEffect } from 'react'
import { contextMenuStore } from './context-menu-store'
import { cn } from '@/common/utils/cn'

export function ContextMenu(props: { children?: React.ReactNode }) {
  const { position, items, selectCallback, close } = contextMenuStore()

  useEffect(() => {
    window.addEventListener('click', close)
    window.addEventListener('keydown', (e) => e.key === 'Escape' && close())

    return () => {
      window.removeEventListener('click', close)
    }
  }, [close])

  return (
    <>
      {props.children}
      {position && (
        <ul
          className="menu bg-base-200 rounded-box w-56 fixed z-5"
          style={{ top: position.y, left: position.x }}
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
                onClick={() => selectCallback?.(item.id)}
                aria-disabled={item.disabled === true}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}
