import { useSharedState, useSharedStore } from './shared-state/shared-state'
import { cn } from './common/utils/cn'
import { GRID_COLUMNS, GRID_ROWS } from './common/utils/const'
import styles from './App.module.css'
import type React from 'react'
import { ContextMenu } from './context-menu/ContextMenu'
import { Toaster } from './toaster/Toaster'
import { WidgetGrid } from './widget-grid/WidgetGrid'
import { useCallback, useEffect, useRef, useState } from 'react'

export function App() {
  useSharedState()
  const store = useSharedStore()
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const ref = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setPosition({ x: e.clientX, y: e.clientY })
  }, [])

  const handleMouseUp = () => {
    store.handleDrop(undefined)
  }

  const test = () => {
    store.setWidget(1, {
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
        <div
          ref={ref}
          onMouseUp={handleMouseUp}
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
          <div className="absolute left-50% bottom-4 text-slate-600 font-mono">
            [pacific-tab]
            <button onClick={test}>add clock</button>
          </div>
        </div>
      </ContextMenu>

      {store.dragData && (
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
