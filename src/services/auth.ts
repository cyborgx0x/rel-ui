import { useAuthLoginQuery, useLazyAuthLoginQuery } from '@/api/authApi';
import { IBodyLogin } from '@/interfaces/auth';

export namespace AuthService {
  export const useLogin = (body: IBodyLogin) => {
    return useAuthLoginQuery(body);
  };
  export const useLazyLogin = () => {
    const [authLogin, { data }] = useLazyAuthLoginQuery();
    return { authLogin, data };
  };
}
