import { googleLogout } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';

import { httpStatus } from '@/configs/Enums/httpStatus';
import { useUser } from '@/contexts/User';
import useAuthService from '@/services/auth';

import useInforGmail from './common/useInforGmail';
import useLoading from './common/useLoading';
import useNotify from './common/useNotify';
import useShowModalLoginGmail from './common/useShowModalLoginGmail';

interface InforGmail {
  email: string;
  picture: string;
  nameP: string;
  email_verified: boolean;
}

const setSession = async (serviceToken: string | undefined, refreshToken = '') => {
  if (serviceToken) {
    localStorage.setItem('serviceToken', serviceToken);
    localStorage.setItem('refreshToken', refreshToken);
  } else {
    localStorage.removeItem('serviceToken');
    localStorage.removeItem('refreshToken');
  }
};

const useAuth = () => {
  const { onNotify } = useNotify();
  const { dispatch } = useUser();
  const { setLoading } = useLoading();
  const { setInforGmail } = useInforGmail();
  const { loginGoogle, logoutAccount, loginLocal } = useAuthService();
  const { setShowModalLoginGmail } = useShowModalLoginGmail();
  const handleClose = () => setShowModalLoginGmail({ isShow: false });

  const loginGmail = async (credential: string) => {
    const body = { credential };
    const informGmail: InforGmail = jwt_decode(credential);
    const res: any = await loginGoogle(body);

    const { data, status } = res || {};
    const { token, refresh } = data || {};
    switch (status) {
      case httpStatus.StatusOK:
        await setSession(token, refresh);
        setInforGmail({ inforGmail: informGmail });
        dispatch({
          type: 'LOGIN',
          payload: {
            isAuthenticated: true,
          },
        });
        onNotify('success', 'Đăng nhập thành công');
        break;
      default:
        break;
    }
  };

  const logout = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    const body = { refresh: refreshToken };
    await logoutAccount(body);
    googleLogout();
    localStorage.removeItem('serviceToken');
    localStorage.removeItem('refreshToken');
    await setSession(undefined);
    setInforGmail({ inforGmail: null });
    dispatch({ type: 'LOGOUT' });
  };
  const handleUserLocal = async (accountLocal: any) => {
    setLoading(true);
    const res: any = await loginLocal(accountLocal);
    setLoading(false);
    const { data, status } = res || {};

    const { access, refresh } = data || {};
    switch (status) {
      case httpStatus.StatusOK:
        await setSession(access, refresh);
        setInforGmail({ inforGmail: { picture: '', name: accountLocal.username } });
        dispatch({
          type: 'LOGIN',
          payload: {
            isAuthenticated: true,
          },
        });
        handleClose();
        onNotify('success', 'Đăng nhập thành công');
        break;
      default:
        break;
    }
  };
  return { loginGmail, logout, handleUserLocal };
};

export default useAuth;
