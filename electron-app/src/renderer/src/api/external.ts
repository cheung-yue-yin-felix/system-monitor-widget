interface ExternalApiOptions {
  params?: Record<string, string | number | undefined | null>
  method?: string
  headers?: Record<string, string>
  body?: unknown
}

interface ExternalApiError {
  status: number
  message: string
  [key: string]: unknown
}

export default function createExternalApi(
  baseURL: string,
  defaultHeaders: Record<string, string> = {}
): (endpoint: string, options?: ExternalApiOptions) => Promise<unknown> {
  return async (endpoint, options = {}) => {
    const url = new URL(`${baseURL}${endpoint}`)

    if (options.params) {
      Object.entries(options.params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value))
        }
      })
    }

    const fetchOptions: RequestInit = {
      method: options.method || 'GET',
      headers: {
        ...defaultHeaders,
        ...options.headers
      }
    }

    if (options.body && ['POST', 'PUT', 'PATCH'].includes(fetchOptions.method || '')) {
      fetchOptions.body = JSON.stringify(options.body)
    }

    const response = await fetch(url.toString(), fetchOptions)

    if (!response.ok) {
      let errorData: Record<string, unknown> = {}
      try {
        errorData = await response.json()
      } catch (e) {
        console.error('Error creating api request', e)
      }

      const error: ExternalApiError = {
        status: response.status,
        message:
          (errorData.message as string) ||
          (errorData.error as string) ||
          response.statusText ||
          'External API error',
        ...errorData
      }

      throw error
    }

    return response.json()
  }
}
