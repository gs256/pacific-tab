export function safeJsonParse(data: string) {
  try {
    return JSON.parse(data)
  } catch {
    return null
  }
}
