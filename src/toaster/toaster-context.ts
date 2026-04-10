import { createContext } from '@/create-context'
import { Toaster } from './Toaster'

export interface ToastOptions {
  text: string
  severity: 'info' | 'success' | 'warning' | 'error'
}

export interface Toaster {
  show: (options: ToastOptions) => void
}

export const [ToasterContext, useToasterContext] = createContext<Toaster>()
