import { Placeholder } from './Placeholder'
import { useSharedContext } from '../shared-state/shared-context'
import { cn } from '../common/utils/cn'
import { GRID_COLUMNS, GRID_ROWS } from '../common/utils/const'
import styles from './WidgetGrid.module.css'

export function WidgetGrid() {
  const sharedContext = useSharedContext()

  return (
    <div
      className={cn(
        styles.grid,
        'grid gap-4',
        `grid-cols-${GRID_COLUMNS}`,
        `grid-rows-${GRID_ROWS}`,
      )}
    >
      {sharedContext.items.map((item, index) => (
        <Placeholder index={index} key={index} widget={item} />
      ))}
    </div>
  )
}
