import type React from 'react'
import { create } from 'zustand'

export interface ContextMenuItem {
  id: string
  label: string
  className?: string
  disabled?: boolean
}

export interface ContextMenuStoreType {
  position: { x: number; y: number } | null
  items: ContextMenuItem[]
  selectCallback: (id: string) => void
  open(params: {
    event: React.MouseEvent
    onClick: (id: string) => void
    items: ContextMenuItem[]
  }): void
  close(): void
}

export const contextMenuStore = create<ContextMenuStoreType>((set) => ({
  items: [],
  position: null,
  selectCallback: () => {},

  open: (params) => {
    params.event.preventDefault()
    set({
      selectCallback: params.onClick,
      items: params.items,
      position: { x: params.event.clientX, y: params.event.clientY },
    })
  },

  close: () => {
    set({ position: null, selectCallback: () => {} })
  },
}))
