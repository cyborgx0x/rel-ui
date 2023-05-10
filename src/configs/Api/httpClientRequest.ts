import axios, { AxiosResponse } from 'axios';
import { isEmpty } from 'lodash';
import qs from 'qs';

import { encrypt } from '@/utils/crypto';

import { HttpRequest, HttpResponse } from '../Enums/api';

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response: AxiosResponse): HttpResponse {
  if (response.status >= 200 && response.status < 300) {
    return {
      statusText: response.statusText,
      status: response.status,
      data: response.data,
      headers: response.headers,
    };
  }

  const error: any = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 *  http client request
 *
 * @param {object} options option for http request
 *
 * @return {object} returns an object with status code, data or throw error
 */
async function request(options: HttpRequest<unknown>): Promise<HttpResponse> {
  const encryptParams = isEmpty(options.params)
    ? {}
    : {
        q: await encrypt(JSON.stringify(options.params)),
      };
  const encryptBody = isEmpty(options.body || options.data)
    ? {}
    : await encrypt(JSON.stringify(options.params || options.data));
  return axios({
    method: options.method || 'get',
    url: options.url,
    headers: options.headers || {},
    data: encryptBody,
    params: encryptParams,
    paramsSerializer: (params) => {
      return qs.stringify(params, {
        arrayFormat: 'repeat',
      });
    },
  }).then(checkStatus);
}

export default request;
