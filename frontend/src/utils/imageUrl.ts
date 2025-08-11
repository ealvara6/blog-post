export const ASSETS_BASE_URL = import.meta.env.VITE_ASSETS_BASE_URL

export const toImageUrl = (path?: string) => {
  if (!path) return
  return new URL(path, ASSETS_BASE_URL).toString()
}
