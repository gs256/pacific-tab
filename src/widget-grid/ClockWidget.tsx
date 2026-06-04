import { useEffect, useState } from 'react'
import { WidgetWrapper } from './WidgetWrapper'
import type { WidgetVariant } from '@/common/types'

function getTimeString() {
  const currentTime = new Date().toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  })
  return currentTime
}

export function ClockWidget(props: {
  index: number | undefined
  variant: WidgetVariant
}) {
  const [timeValue, setTimeValue] = useState(getTimeString())

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeValue(getTimeString())
    }, 100)
    return () => clearInterval(interval)
  }, [])

  return (
    <WidgetWrapper
      variant={props.variant}
      index={props.index}
      config={{ type: 'clock', data: '', spanX: 2 }}
      className="w-full h-full p-3"
    >
      <div className="flex flex-1 items-center justify-center bg-gray-800 card">
        {props.variant === 'spawner' ? (
          <div className="font-light text-xl">9:35 PM</div>
        ) : (
          <div className="font-light text-xl">{timeValue}</div>
        )}
      </div>
    </WidgetWrapper>
  )
}
