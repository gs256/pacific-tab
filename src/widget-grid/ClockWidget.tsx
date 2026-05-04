import { useEffect, useState } from 'react'
import { WidgetWrapper } from './WidgetWrapper'

function getTimeString() {
  const currentTime = new Date().toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  })
  return currentTime
}

export function ClockWidget(props: { index: number }) {
  const [timeValue, setTimeValue] = useState(getTimeString())

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeValue(getTimeString())
    }, 100)
    return () => clearInterval(interval)
  }, [])

  return (
    <WidgetWrapper
      index={props.index}
      data={''}
      type="clock"
      spanX={2}
      className="w-full h-full p-3"
    >
      <div className="flex flex-1 items-center justify-center bg-gray-800 card">
        <div className="font-light text-xl">{timeValue}</div>
      </div>
    </WidgetWrapper>
  )
}
