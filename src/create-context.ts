import {
  createContext as reactCreateContext,
  useContext as reactUseContext,
} from 'react'

export function createContext<T>() {
  const Context = reactCreateContext<T | undefined>(undefined)

  function useContext() {
    const value = reactUseContext(Context)
    if (value === undefined) {
      throw new Error(`${Context.displayName ?? 'Context'} is undefined`)
    }
    return value
  }

  return [Context, useContext] as const
}
