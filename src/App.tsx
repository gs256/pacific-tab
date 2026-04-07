import { Placeholder } from './Placeholder'
import { SharedContext } from './shared-context'
import { useSharedState } from './shared-state'
import { cn } from './utils/cn'
import { GRID_COLUMNS, GRID_ROWS } from './utils/const'
import styles from './App.module.css'
import type React from 'react'
import { ContextMenu } from './context-menu/ContextMenu'

export function App() {
  const sharedState = useSharedState()

  return (
    <SharedContext.Provider value={sharedState}>
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
          <div
            className={cn(
              styles.grid,
              'grid gap-4',
              `grid-cols-${GRID_COLUMNS}`,
              `grid-rows-${GRID_ROWS}`,
            )}
          >
            {sharedState.items.map((_, index) => (
              <Placeholder index={index} key={index} />
            ))}
          </div>
          <div className="absolute left-50% bottom-4 text-slate-700 font-mono">
            [pacific-tab]
          </div>
        </div>
      </ContextMenu>
    </SharedContext.Provider>
  )
}
