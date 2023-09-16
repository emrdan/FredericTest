import { AxiosHttpClient } from "../../lib/http-clients/axios";
import { HttpClient, HttpResponse } from "./http-client";

export abstract class ServiceProvider {
  protected baseUrl: string;
  private httpClient: HttpClient;
   
  constructor (baseUrl: string) {
    this.baseUrl = baseUrl
    this.httpClient = new AxiosHttpClient();
  }

  protected get (
    url: string, 
    query?: Record<string, string | number>, 
    headers?: Record<string, string>
  ): Promise<HttpResponse> {
    return this.httpClient.request(`${this.baseUrl}${url}`, {
      method: 'GET',
      queryParams: query,
      headers
    })
  }

  protected post (
    url: string, 
    body?: {
      [index: string]: unknown
    }, 
    headers?: Record<string, string>
  ): Promise<HttpResponse> {
    return this.httpClient.request(`${this.baseUrl}${url}`, {
      method: 'POST',
      bodyParams: body,
      headers
    })
  }

  protected put (
    url: string, 
    query?: Record<string, string | number>, 
    body?: {
      [index: string]: unknown
    }, 
    headers?: Record<string, string>
  ): Promise<HttpResponse> {
    return this.httpClient.request(`${this.baseUrl}${url}`, {
      method: 'PUT',
      queryParams: query,
      bodyParams: body,
      headers
    })
  }

  protected delete (
    url: string,
    query?: Record<string, string | number>, 
    body?: {
      [index: string]: unknown
    },
    headers?: Record<string, string>
  ): Promise<HttpResponse> {
    return this.httpClient.request(`${this.baseUrl}${url}`, {
      method: 'DELETE',
      queryParams: query,
      bodyParams: body,
      headers
    })
  }
} 