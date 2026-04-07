import { createContext } from '@/create-context'

export interface ContextMenuContextType {
  onClick(e: React.MouseEvent): void
}

export const [ContextMenuContext, useContextMenuContext] =
  createContext<ContextMenuContextType>()
