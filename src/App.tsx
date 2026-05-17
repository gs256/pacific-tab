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

export function App() {
  useSharedState()
  const { handleDrop, setWidget, dragData } = useSharedStore()
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const ref = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setPosition({ x: e.clientX, y: e.clientY })
  }, [])

  const handleMouseUp = () => {
    handleDrop(undefined)
  }

  const test = () => {
    setWidget(1, {
      type: 'clock',
      data: '',
      spanX: 2,
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
            <div className="absolute left-0 w-full bottom-4 text-slate-600 font-mono flex justify-center">
              [pacific-tab]
            </div>
          </WidgetDrawer>
        </div>
      </ContextMenu>

      {dragData && (
        <div
          className="absolute"
          style={{ left: position.x, top: position.y, pointerEvents: 'none' }}
        >
          <div>drag me</div>
        </div>
      )}
    </Toaster>
  )
}
