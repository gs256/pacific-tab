import type React from 'react'
import { useToaster, type Toaster, type ToastOptions } from './useToaster'
import { useCallback, useEffect, useRef, useState } from 'react'
import { cn } from '@/common/utils/cn'
import styles from './Toaster.module.css'

const severityClasses: Record<ToastOptions['severity'], string> = {
  info: 'alert-info',
  success: 'alert-success',
  warning: 'alert-warning',
  error: 'alert-error',
}

export function Toaster(props: { children?: React.ReactNode }) {
  const { setShowCallback } = useToaster()
  const [visible, setVisible] = useState(false)
  const [text, setText] = useState('')
  const [severity, setSeverity] = useState<ToastOptions['severity']>('info')
  const showTimeout = useRef<number | undefined>(undefined)
  const hideTimeout = useRef<number | undefined>(undefined)

  const show = useCallback(
    (options: ToastOptions) => {
      setText(options.text)
      setSeverity(options.severity)

      let delay = 0
      if (visible) {
        setVisible(false)
        delay = 300
      }

      clearTimeout(showTimeout.current)
      showTimeout.current = setTimeout(() => {
        setVisible(true)

        clearTimeout(hideTimeout.current)
        hideTimeout.current = setTimeout(() => {
          setVisible(false)
        }, 3_000)
      }, delay)
    },
    [visible],
  )

  useEffect(() => {
    setShowCallback(show)
  }, [setShowCallback, show])

  return (
    <>
      {props.children}
      <div
        className={cn(
          styles.toast,
          'toast toast-top toast-center',
          visible ? styles.on : styles.off,
        )}
      >
        <div className={cn('alert alert-error', severityClasses[severity])}>
          <span>{text}</span>
        </div>
      </div>
    </>
  )
}
