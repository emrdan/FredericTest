export type HttpRequestOptions = {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  headers?: Record<string, string>,
  queryParams?: Record<string, string | number>,
  bodyParams?: {
    [index: string]: unknown
  },
  timeoutInMs?: number
}

export type HttpResponse = {
  status: number,
  headers: unknown,
  data: unknown
}

export interface HttpClient {
  request(url: string, options: HttpRequestOptions): Promise<HttpResponse>;
}