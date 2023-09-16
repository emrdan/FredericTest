import { HttpClient, HttpRequestOptions, HttpResponse } from "../../models/shared/http-client";
import axios, { AxiosRequestConfig } from 'axios';

export class AxiosHttpClient implements HttpClient {
  async request(url: string, options: HttpRequestOptions): Promise<HttpResponse> {
    const axiosOptions: AxiosRequestConfig = {
      method: options.method,
      url,
      params: options.queryParams,
      data: options.bodyParams,
      timeout: options.timeoutInMs ? options.timeoutInMs : 5000
    }

    const result = await axios(axiosOptions);
    
    return {
      status: result.status,
      headers: result.headers,
      data: result.data
    }
  }
}