import { createContext, useContext } from 'react'

export interface PlaceholderContextType {
  setTooltip: (tooltip: string) => void
}

export const PlaceholderContext = createContext<
  PlaceholderContextType | undefined
>(undefined)

export function usePlaceholderContext() {
  const placeholder = useContext(PlaceholderContext)
  if (!placeholder) {
    throw Error(`${PlaceholderContext.displayName} is not defined`)
  }
  return placeholder
}
