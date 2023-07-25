import { urlApi } from '@/configs/Api';
import useRequest from '@/Hooks/common/useRequest';

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
  const logoutAccount = (body = {}) => {
    return new Promise((resolve, reject) => {
      methodPost(urlApi.auth.logoutAccount, body)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  const loginLocal = (body = {}) => {
    return new Promise((resolve, reject) => {
      methodPost(urlApi.auth.loginLocal, body)
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
    logoutAccount,
    loginLocal,
  };
};
export default useAuthService;
