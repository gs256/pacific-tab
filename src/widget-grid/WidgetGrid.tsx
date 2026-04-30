import { Placeholder } from './Placeholder'
import { cn } from '../common/utils/cn'
import { GRID_COLUMNS, GRID_ROWS } from '../common/utils/const'
import styles from './WidgetGrid.module.css'
import { useSharedStore } from '@/shared-state/shared-state'

export function WidgetGrid() {
  const { items } = useSharedStore()

  return (
    <div
      className={cn(
        styles.grid,
        'grid gap-4',
        `grid-cols-${GRID_COLUMNS}`,
        `grid-rows-${GRID_ROWS}`,
      )}
    >
      {items.map((item, index) => (
        <Placeholder index={index} key={index} widget={item} />
      ))}
    </div>
  )
}
