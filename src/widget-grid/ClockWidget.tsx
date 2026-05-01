import { WidgetWrapper } from './WidgetWrapper'

export function ClockWidget(props: { index: number }) {
  return (
    <WidgetWrapper
      index={props.index}
      data={''}
      type="clock"
      spanX={2}
      className="w-full h-full items-center justify-center border-1"
    >
      <div>TODO Clock</div>
    </WidgetWrapper>
  )
}
