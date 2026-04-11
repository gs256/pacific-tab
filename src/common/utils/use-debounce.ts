import { useRef } from 'react'

export function useDebounce<T extends (...args: unknown[]) => void>(
  callback: T,
  delay: number,
) {
  const timer = useRef<ReturnType<typeof setTimeout>>(null)

  return (...args: Parameters<T>) => {
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => callback(...args), delay)
  }
}
