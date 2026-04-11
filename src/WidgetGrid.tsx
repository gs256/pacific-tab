import { BookmarkWidget } from './BookmarkWidget'
import { Placeholder } from './Placeholder'
import { useSharedContext } from './shared-context'
import { cn } from './utils/cn'
import { GRID_COLUMNS, GRID_ROWS } from './utils/const'
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
        <Placeholder index={index} key={index}>
          {item?.type === 'url' && (
            <BookmarkWidget index={index} value={item.data} />
          )}
        </Placeholder>
      ))}
    </div>
  )
}
