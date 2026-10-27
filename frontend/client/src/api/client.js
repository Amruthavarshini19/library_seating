export const BASE_URL = import.meta.env.VITE_API_URL || "/api"
export const wait = (ms = 400) =>
  new Promise((resolve) => setTimeout(resolve, ms))
