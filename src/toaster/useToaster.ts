import { Toaster } from './Toaster'
import { create } from 'zustand'

export interface ToastOptions {
  text: string
  severity: 'info' | 'success' | 'warning' | 'error'
}

export interface Toaster {
  showCallback: (options: ToastOptions) => void
  setShowCallback: (callback: (options: ToastOptions) => void) => void
  show: (options: ToastOptions) => void
}

export const useToaster = create<Toaster>((set, state) => ({
  showCallback: () => {},

  show: (options: ToastOptions) => {
    state().showCallback(options)
  },

  setShowCallback: (callback) => {
    set({ showCallback: callback })
  },
}))
