import { useEffect, useMemo, useRef, useState } from 'react'
import { cn } from '../common/utils/cn'
import { isUrl } from '../common/utils/is-url'
import { usePlaceholderContext } from './placeholder-context'
import { WidgetWrapper } from './WidgetWrapper'
import type { WidgetVariant } from '@/common/types'

function urlOrNull(str: string) {
  try {
    return new URL(str)
  } catch {
    return null
  }
}

export function BookmarkWidget(props: {
  index: number
  value: string
  variant: WidgetVariant
}) {
  const ref = useRef(null)
  const [iconLoading, setIconLoading] = useState(false)
  const { setTooltip } = usePlaceholderContext()

  useEffect(() => {
    setTooltip(props.value)
    return () => setTooltip('')
  }, [setTooltip, props.value])

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

  return (
    <WidgetWrapper
      index={props.index}
      config={{ data: props.value, type: 'url' }}
      variant={props.variant}
    >
      <div
        ref={ref}
        className={cn(
          'rounded-full w-12 h-12 bg-gray-800 flex items-center justify-center',
        )}
        onClick={handleClick}
      >
        <FaviconImg
          key={faviconUrl}
          src={faviconUrl}
          setLoading={setIconLoading}
        />
        {iconLoading && <div className="absolute">{firstLetter}</div>}
      </div>
    </WidgetWrapper>
  )
}

function FaviconImg(props: {
  src: string
  setLoading: (isLoading: boolean) => void
}) {
  const { setLoading } = props
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>(
    'loading',
  )

  useEffect(() => {
    setLoading(status === 'loading')
  }, [setLoading, status])

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
