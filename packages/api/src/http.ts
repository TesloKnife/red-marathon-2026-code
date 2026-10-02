let getToken: () => Promise<string | null> = async () => null
let onRefresh: (() => Promise<boolean>) | null = null
let onUnauthorized: (() => void) | null = null
let baseUrl: string = ''

export const configureApi = (options: {
  baseUrl: string
  getToken: () => Promise<string | null>
  onRefresh?: () => Promise<boolean>
  onUnauthorized?: () => void
}) => {
  getToken = options.getToken
  baseUrl = options.baseUrl
  onRefresh = options.onRefresh ?? null
  onUnauthorized = options.onUnauthorized ?? null
}

export class ApiError extends Error {
  constructor(
    public status: number,
    public messages: string[]
  ) {
    super(messages[0])
  }
}

let refreshPromise: Promise<boolean> | null = null

const request = async (url: string, init?: RequestInit) => {
  const token = await getToken()

  return fetch(`${baseUrl}${url}`, {
    ...init,
    headers: {
      ...(init?.headers || {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    }
  })
}

export const http = async <T>(url: string, init?: RequestInit): Promise<T> => {
  if (!baseUrl) {
    throw new Error(
      'API is not configured (EXPO_PUBLIC_API_URL пуст. Проверь apps/mobile/.env и перезапусти: npx expo start --clear)'
    )
  }

  let response = await request(url, init)

  if (response.status === 401 && onRefresh && !url.includes('/auth')) {
    if (!refreshPromise) {
      refreshPromise = onRefresh().finally(() => {
        refreshPromise = null
      })
    }

    const isRefreshed = await refreshPromise

    if (isRefreshed) {
      response = await request(url, init)
    } else {
      onUnauthorized?.()
    }
  }

  if (!response.ok) {
    const body = await response.json().catch(() => null)
    console.error('[api] error body:', JSON.stringify(body))
    const raw = body?.message ?? response.statusText
    throw new ApiError(response.status, Array.isArray(raw) ? raw : [raw])
  }

  const data = response.status === 204 ? undefined : await response.json()

  return { data, status: response.status, headers: response.headers } as T
}
