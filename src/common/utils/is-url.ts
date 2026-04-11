export function isUrl(value?: string | null) {
  if (!value) {
    return false
  }
  try {
    new URL(value)
    return true
  } catch {
    return false
  }
}
