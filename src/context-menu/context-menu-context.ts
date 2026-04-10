import { createContext } from '@/create-context'
import type React from 'react'

export interface ContextMenuItem {
  id: string
  label: string
  className?: string
}

export interface ContextMenuContextType {
  open(params: {
    event: React.MouseEvent
    onClick: (id: string) => void
    items: ContextMenuItem[]
  }): void
}

export const [ContextMenuContext, useContextMenuContext] =
  createContext<ContextMenuContextType>()
