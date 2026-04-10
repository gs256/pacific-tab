import { createContext } from '@/create-context'
import type React from 'react'

export interface ContextMenuContextType {
  open(params: {
    event: React.MouseEvent
    onClick: (id: string) => void
    items: Array<{ id: string; label: string }>
  }): void
}

export const [ContextMenuContext, useContextMenuContext] =
  createContext<ContextMenuContextType>()
