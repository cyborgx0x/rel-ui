import { AxiosRequestConfig, AxiosResponse } from 'axios';

const PATH = {
  AUTH: {
    LOGIN: 'login',
    LOGIN_GOOGLE: 'authentication/verify/',
  },
  SEARCH: 'data/search',
};

export enum SUBPATH {
  NONE = '',
  STATISTICS = 'statistics',
  ARTICLE = 'article',
  LIST = 'list',
}

export type ApiVersion = 'v1';

export type HttpMethod = 'POST' | 'GET' | 'PUT' | 'PATCH' | 'DELETE' | 'OPTIONS';

export interface HttpRequest<T extends AxiosRequestConfig['data']> {
  url?: string;
  method: HttpMethod;
  headers?: Record<string, string | number | boolean>;
  body?: T;
  data?: T;
  params?: AxiosRequestConfig['params'];
}

export interface HttpResponse<R = any> {
  // ok: boolean;
  status: number;
  statusText: string;
  headers: AxiosResponse['headers'];
  data: R;
}

export default PATH;
