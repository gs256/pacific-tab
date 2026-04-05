import { Placeholder } from './Placeholder'
import { SharedContext } from './shared-context'
import { useSharedState } from './shared-state'
import { cn } from './utils/cn'
import { GRID_COLUMNS, GRID_ROWS } from './utils/const'
import styles from './App.module.css'
import type React from 'react'

export function App() {
  const sharedState = useSharedState()

  return (
    <SharedContext.Provider value={sharedState}>
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
      </div>
    </SharedContext.Provider>
  )
}
