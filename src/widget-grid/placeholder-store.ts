import { create } from 'zustand'

export interface PlaceholderStoreType {
  tooltip: string
  setTooltip: (tooltip: string) => void
}

export const usePlaceholderStore = create<PlaceholderStoreType>((set) => ({
  tooltip: '',
  setTooltip: (tooltip: string) => set({ tooltip }),
}))
