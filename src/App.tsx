import { useSharedState, useSharedStore } from './shared-state/shared-state'
import { cn } from './common/utils/cn'
import { GRID_COLUMNS, GRID_ROWS } from './common/utils/const'
import styles from './App.module.css'
import type React from 'react'
import { ContextMenu } from './context-menu/ContextMenu'
import { Toaster } from './toaster/Toaster'
import { WidgetGrid } from './widget-grid/WidgetGrid'
import { useCallback, useEffect, useRef, useState } from 'react'
import { WidgetDrawer } from './widget-drawer/WidgetDrawer'
import { span } from './common/utils/widget-utils'
import { Ellipsis, Plus } from 'lucide-react'
import { contextMenuStore } from './context-menu/context-menu-store'

export function App() {
  useSharedState()
  const { handleDrop, dragData, importItems, exportItems } = useSharedStore()
  const { open } = contextMenuStore()
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const ref = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setPosition({ x: e.clientX, y: e.clientY })
  }, [])

  const handleMouseUp = () => {
    handleDrop(undefined)
  }

  const openElipsisMenu = (event: React.MouseEvent) => {
    // FIXME: page-wide click callback closes menu, hence stopPropagation()
    event.stopPropagation()

    open({
      event: event,
      onClick: (id: string) => {
        if (id === 'export') {
          exportItems()
        } else if (id === 'import') {
          navigator.clipboard.readText().then((text) => {
            importItems(text)
          })
        }
      },
      items: [
        {
          id: 'export',
          label: 'Export layout',
        },
        {
          id: 'import',
          label: 'Import layout',
        },
      ],
    })
  }

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [handleMouseMove])

  return (
    <Toaster>
      <ContextMenu>
        <div ref={ref} onMouseUp={handleMouseUp}>
          <WidgetDrawer
            className={cn(
              styles.app,
              'flex items-center justify-center min-h-screen',
            )}
            style={
              {
                '--grid-cols': GRID_COLUMNS,
                '--grid-rows': GRID_ROWS,
              } as React.CSSProperties
            }
          >
            <WidgetGrid />
            <div className="flex justify-center mt-4 gap-3">
              <label htmlFor="my-drawer-1" className="drawer-button">
                <Plus className="h-5 w-5 text-gray-400 cursor-pointer" />
              </label>
              <Ellipsis
                className="h-5 w-5 text-gray-400 cursor-pointer"
                onClick={openElipsisMenu}
              />
            </div>
            <div className="absolute left-0 w-full bottom-4 text-slate-600 font-mono flex justify-center">
              [pacific-tab]
            </div>
          </WidgetDrawer>
        </div>
      </ContextMenu>

      {dragData && (
        <div
          className="absolute card bg-gray-500"
          style={{
            left: position.x - 15,
            top: position.y - 15,
            width: span(dragData.widget) === 2 ? 10 * 4 * 2 + 2 * 4 : 10 * 4,
            height: 10 * 4,
            pointerEvents: 'none',
          }}
        ></div>
      )}
    </Toaster>
  )
}
