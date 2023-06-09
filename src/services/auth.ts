import { useAuthLoginQuery, useLazyAuthLoginQuery } from '@/api/authApi';
import { urlApi } from '@/configs/Api';
import useRequest from '@/Hooks/common/useRequest';
import { IBodyLogin } from '@/interfaces/auth';

const useAuthService = () => {
  const { methodPost } = useRequest();
  const loginGoogle = (body: any) => {
    return new Promise((resolve, reject) => {
      methodPost(urlApi.auth.loginGoogle, body)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  return {
    loginGoogle,
  };
};
export default useAuthService;
