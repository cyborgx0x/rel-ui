import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import { AxiosError, AxiosRequestConfig } from 'axios';

import { decrypt, encrypt } from '@/utils/crypto';
import { getTokenStorage } from '@/utils/function';

import httpClientRequest from './httpClientRequest';
import { ApiVersion, HttpMethod, SUBPATH } from '../Enums/api';

const getSubPath = (subPath: SUBPATH) => {
  if (subPath === SUBPATH.NONE) {
    return '';
  }
  return `/${subPath}`;
};

const getHeaders = async () => {
  const serviceToken = await getTokenStorage();
  let newHeader: Record<string, string | number | boolean> = {
    'Content-Type': '*',
    Accept: '*',
  };
  if (serviceToken) {
    newHeader = {
      'Content-Type': '*',
      Authorization: `Bearer ${serviceToken}`,
    };
  }
  return newHeader;
};

const axiosBaseQuery =
  ({
    baseUrl,
    apiVersion,
    subPath,
  }: {
    baseUrl: string;
    apiVersion: ApiVersion;
    subPath: SUBPATH;
  }): BaseQueryFn<
    {
      url: string;
      method: HttpMethod;
      data?: AxiosRequestConfig['data'];
      params?: AxiosRequestConfig['params'];
      headers?: Record<string, string | number | boolean>;
      overrideApiVersion?: ApiVersion;
      overrideSubPath?: SUBPATH;
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params, headers, overrideApiVersion, overrideSubPath }) => {
    const newApiVersion = overrideApiVersion || apiVersion;
    const newSubPath = getSubPath(overrideSubPath || subPath);
    try {
      const result = await httpClientRequest({
        url: `${baseUrl}/api/${newApiVersion}${newSubPath}/${url}`,
        method,
        headers: await getHeaders(),
        data,
        params,
      });
      let decryptResult: any = await decrypt(result.data);
      if (decryptResult?.result) {
        decryptResult.result = { ...decryptResult.result, data: JSON.parse(decryptResult.result.data) };
      } else {
        decryptResult = { ...decryptResult, data: JSON.parse(decryptResult.data) };
      }
      return { data: decryptResult };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

export { axiosBaseQuery };
