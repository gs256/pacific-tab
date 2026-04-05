import { useEffect, useMemo, useState } from 'react'
import { useSharedContext } from './shared-context'
import { cn } from '@/utils/cn'

export function Placeholder(props: { index: number }) {
  const sharedContext = useSharedContext()
  const value = sharedContext.items.at(props.index) ?? ''
  const [iconLoading, setIconLoading] = useState(false)

  const isUrl = useMemo(() => {
    return Boolean(value) && value.startsWith('http') // FIXME
  }, [value])

  const url = useMemo<URL | null>(() => {
    try {
      return new URL(value)
    } catch {
      return null
    }
  }, [value])

  const faviconUrl = url
    ? `https://icons.duckduckgo.com/ip2/${url.hostname}.ico`
    : ''

  const firstLetter = (url?.host.at(0) ?? '').toUpperCase()

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const dropped = e.dataTransfer?.getData('text/plain')
    if (Boolean(dropped) && dropped.startsWith('http')) {
      sharedContext.setUrl(props.index, dropped)
    }
  }

  const handleClick = () => {
    if (isUrl) {
      window.open(value)
    }
  }

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      data-tip={value}
      className="card card-border bg-base-300 w-17 h-17 text-center items-center justify-center tooltip select-none cursor-pointer"
      onClick={handleClick}
    >
      {isUrl ? (
        <div className="rounded-full w-12 h-12 bg-gray-800 flex items-center justify-center">
          <FaviconImg
            key={faviconUrl}
            src={faviconUrl}
            setLoading={setIconLoading}
          />
          {iconLoading && <div className="absolute">{firstLetter}</div>}
        </div>
      ) : (
        <>{firstLetter}</>
      )}
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
      className={cn('w-7 h-7', status !== 'loaded' && 'invisible')}
    />
  )
}
