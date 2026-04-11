import { SharedContext } from './shared-state/shared-context'
import { useSharedState } from './shared-state/shared-state'
import { cn } from './common/utils/cn'
import { GRID_COLUMNS, GRID_ROWS } from './common/utils/const'
import styles from './App.module.css'
import type React from 'react'
import { ContextMenu } from './context-menu/ContextMenu'
import { Toaster } from './toaster/Toaster'
import { WidgetGrid } from './widget-grid/WidgetGrid'

export function App() {
  const sharedState = useSharedState()

  return (
    <SharedContext.Provider value={sharedState}>
      <Toaster>
        <ContextMenu>
          <div
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
            </div>
          </div>
        </ContextMenu>
      </Toaster>
    </SharedContext.Provider>
  )
}
