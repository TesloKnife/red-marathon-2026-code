let getToken: () => Promise<string | null> = async () => null
let baseUrl: string = ''

export const configureApi = (options: {
  baseUrl: string
  getToken: () => Promise<string | null>
}) => {
  getToken = options.getToken
  baseUrl = options.baseUrl
}

export class ApiError extends Error {
  constructor(
    public status: number,
    public messages: string[]
  ) {
    super(messages[0])
  }
}

export const http = async <T>(url: string, init?: RequestInit): Promise<T> => {
  if (!baseUrl) {
    throw new Error(
      'API is not configured (EXPO_PUBLIC_API_URL пуст. Проверь apps/mobile/.env и перезапусти: npx expo start --clear)'
    )
  }

  const token = await getToken()

  let response: Response
  try {
    response = await fetch(`${baseUrl}${url}`, {
      ...init,
      headers: {
        ...(init?.headers || {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      }
    })
  } catch (e) {
    // сетевая ошибка: бэкенд не запущен или адрес недоступен
    // (на физическом телефоне localhost = сам телефон, а не ПК!)
    console.error('[api] NETWORK ERROR — backend unreachable from the app:', e)
    throw e
  }

  if (!response.ok) {
    const body = await response.json().catch(() => null)
    console.error('[api] error body:', JSON.stringify(body))
    const raw = body?.message ?? response.statusText
    throw new ApiError(response.status, Array.isArray(raw) ? raw : [raw])
  }

  if (response.status === 204) {
    return undefined as T
  }

  return response.json()
}
