import { createApi } from '@reduxjs/toolkit/query/react';

import { axiosBaseQuery } from './axiosQueryBase';
import { SUBPATH } from '../Enums/api';

export const getBaseApi = () => {
  const baseUrl = process.env.REACT_APP_URL;
  return baseUrl ?? '';
};

const createBaseApi = () => {
  const baseUrl = getBaseApi();
  return createApi({
    endpoints(builder) {
      return {};
    },
    reducerPath: 'api',
    baseQuery: axiosBaseQuery({
      baseUrl,
      apiVersion: 'v1',
      subPath: SUBPATH.NONE,
    }),
  });
};

export const baseApi = createBaseApi();
