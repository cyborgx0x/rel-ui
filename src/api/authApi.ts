import { baseApi } from '@/configs/Api/baseApi';
import { IBodyLogin, ILogin } from '@/interfaces/auth';
import { HttpResponseAuth } from '@/interfaces/common';

const authRestApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    authLogin: builder.query<HttpResponseAuth<ILogin>, IBodyLogin>({
      query: (body) => ({
        url: 'bio-login',
        method: 'POST',
        data: body,
      }),
    }),
  }),
});

export const { useAuthLoginQuery, useLazyAuthLoginQuery } = authRestApi;
