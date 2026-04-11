import { useEffect, useMemo, useRef, useState } from 'react'
import { cn } from '../common/utils/cn'
import { useSharedContext } from '../shared-state/shared-context'
import { isUrl } from '../common/utils/is-url'
import { usePlaceholderContext } from './placeholder-context'

function urlOrNull(str: string) {
  try {
    return new URL(str)
  } catch {
    return null
  }
}

export function BookmarkWidget(props: { index: number; value: string }) {
  const sharedContext = useSharedContext()
  const ref = useRef(null)
  const [iconLoading, setIconLoading] = useState(false)
  const placeholder = usePlaceholderContext()

  useEffect(() => {
    placeholder.setTooltip(props.value)
    return () => placeholder.setTooltip('')
  }, [placeholder, props.value])

  const url = urlOrNull(props.value)

  const faviconUrl = url
    ? `https://icons.duckduckgo.com/ip2/${url.hostname}.ico`
    : ''

  const firstLetter = (url?.host.at(0) ?? '').toUpperCase()

  const valueIsUrl = useMemo(() => isUrl(props.value), [props.value])

  const handleClick = () => {
    if (valueIsUrl) {
      window.open(props.value)
    }
  }

  const handleDragStart = () => {
    sharedContext.setDragData({ index: props.index, value: props.value })
  }

  return (
    <div
      ref={ref}
      onDragStart={handleDragStart}
      className={cn(
        'rounded-full w-12 h-12 bg-gray-800 flex items-center justify-center',
      )}
      onClick={handleClick}
      draggable
    >
      <FaviconImg
        key={faviconUrl}
        src={faviconUrl}
        setLoading={setIconLoading}
      />
      {iconLoading && <div className="absolute">{firstLetter}</div>}
    </div>
  )
}

function FaviconImg(props: {
  src: string
  setLoading: (isLoading: boolean) => void
}) {
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>(
    'loading',
  )

  useEffect(() => {
    props.setLoading(status === 'loading')
  }, [props, status])

  return (
    <img
      src={props.src}
      alt="favicon"
      onLoad={() => setStatus('loaded')}
      onError={() => setStatus('error')}
      className={cn(
        'w-7 h-7 pointer-events-none',
        status !== 'loaded' && 'invisible',
      )}
    />
  )
}
