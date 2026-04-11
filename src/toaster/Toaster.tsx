import type React from 'react'
import {
  ToasterContext,
  type Toaster,
  type ToastOptions,
} from './toaster-context'
import { useRef, useState } from 'react'
import { cn } from '@/common/utils/cn'
import styles from './Toaster.module.css'

const severityClasses: Record<ToastOptions['severity'], string> = {
  info: 'alert-info',
  success: 'alert-success',
  warning: 'alert-warning',
  error: 'alert-error',
}

export function Toaster(props: { children?: React.ReactNode }) {
  const [visible, setVisible] = useState(false)
  const [text, setText] = useState('')
  const [severity, setSeverity] = useState<ToastOptions['severity']>('info')
  const showTimeout = useRef<number | undefined>(undefined)
  const hideTimeout = useRef<number | undefined>(undefined)

  const context: Toaster = {
    show: (options) => {
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
  }

  return (
    <ToasterContext.Provider value={context}>
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
    </ToasterContext.Provider>
  )
}
