export function isUrl(value?: string | null) {
  if (!value) {
    return false
  }
  if (!value.startsWith('http://') && !value.startsWith('https://')) {
    value = 'https://' + value
  }
  try {
    new URL(value)
    return true
  } catch {
    return false
  }
}

export function normalizeUrl(url: string) {
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    url = 'https://' + url
  }
  return url
}
