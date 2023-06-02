import { httpStatus } from '@/configs/Enums/httpStatus';
import { useUser } from '@/contexts/User';
import { AuthService } from '@/services/auth';

import useInforGmail from './common/useInforGmail';
import useLoading from './common/useLoading';
import useNotify from './common/useNotify';

const setSession = async (serviceToken: string | undefined) => {
  if (serviceToken) {
    localStorage.setItem('serviceToken', serviceToken);
  } else {
    localStorage.removeItem('serviceToken');
  }
};

const useAuth = () => {
  const { authLogin } = AuthService.useLazyLogin();
  const { onNotify } = useNotify();
  const { dispatch } = useUser();
  const { setLoading } = useLoading();
  const { setInforGmail } = useInforGmail();
  const login = async (account: string, password: string) => {
    setLoading(true);
    const response = await authLogin({ account, password, device_id: '', platform_type: 'ios', is_bio: false });
    setLoading(false);
    if (response.data?.result.status === httpStatus.StatusOK) {
      await setSession(response.data?.result.data.token);
      dispatch({
        type: 'LOGIN',
        payload: {
          isAuthenticated: true,
        },
      });
      onNotify('success', 'Đăng nhập thành công');
    } else {
      onNotify('error', 'Thất bại', response.data?.result?.msg);
    }
  };
  const loginGmail = async (email: string) => {
    await setSession(email);
    dispatch({
      type: 'LOGIN',
      payload: {
        isAuthenticated: true,
      },
    });
    onNotify('success', 'Đăng nhập thành công');
  };

  const logout = async () => {
    await setSession(undefined);
    dispatch({ type: 'LOGOUT' });
  };

  return { login, loginGmail, logout };
};

export default useAuth;
