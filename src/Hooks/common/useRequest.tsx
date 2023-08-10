import axios from 'axios';
import { gapi } from 'gapi-script';
import * as _ from 'lodash';

import { useUser } from '@/contexts/User';

import useInforGmail from './useInforGmail';
import useLoading from './useLoading';
import useNotify from './useNotify';
import useShowModal from './useShowModal';

const TIME_OUT = 150000;

const useRequest = () => {
  const { onNotify } = useNotify();

  const axiosMethod = axios;
  axiosMethod.defaults.timeout = TIME_OUT;
  // const { updateUserToken } = useUser();
  const { setShowModal } = useShowModal();
  const { setLoading } = useLoading();
  const { setInforGmail } = useInforGmail();
  const { dispatch } = useUser();
  const getHeaders = async () => {
    const accessToken = localStorage.getItem('serviceToken');
    if (accessToken) {
      return {
        'Content-Type': 'application/json',
        // 'Content-Type': '*',
        Authorization: `Bearer ${accessToken}`,
        // 'Access-Control-Allow-Origin': '*',
      };
    }
    return {
      // 'Content-Type': '*',
      'Content-Type': 'application/json',
      // 'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
    };
  };

  const handleError = (err: any, reject: any) => {
    setLoading(false);
    if (err?.message?.includes?.('401')) {
      onNotify('error', 'Hết phiên đăng nhập, vui lòng đăng nhập lại')
      logout();
    } else if (err?.message === 'Network Error') {
      onNotify('error', err?.message)
    } else if (err?.message?.includes?.('403')) {
      onNotify('error', 'Vui lòng thử lại')
    } else if (err?.message?.includes('timeout')) {
      onNotify('error', err?.message)
    } else if (err?.message?.includes('500') || err?.message?.includes('502') || err?.message?.includes('503')) {
      onNotify('error', err?.message)
    } else {
      setShowModal({ isShow: true, content: err?.message });
    }

    return reject(err);
  };

  const logoutGoogle = () => {
    const auth2 = gapi.auth2.getAuthInstance();
    if (auth2 != null) {
      auth2.signOut().then(() => {
        auth2.disconnect();
        console.log('Logout success');
      });
    }
  };

  const logout = async () => {
    logoutGoogle();
    localStorage.removeItem('serviceToken');
    localStorage.removeItem('refreshToken');
    setInforGmail({ inforGmail: null });
    dispatch({ type: 'LOGOUT' });
  };

  const methodGet = async (url: string, params?: any) => {
    const attributes = { headers: await getHeaders(), params };
    return new Promise((resolve, reject) => {
      axiosMethod
        .get(url, attributes)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          handleError(err, reject);
        });
    });
  };

  const methodPost = async (url: string, body: any) => {
    const attributes = {
      // cache: true,
      headers: await getHeaders(),
    };
    return new Promise((resolve, reject) => {
      axiosMethod
        .post(url, body, attributes)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          handleError(err, reject);
        });
    });
  };

  const methodPut = async (url: string, body: any) => {
    const attributes = {
      // cache: true,
      headers: await getHeaders(),
    };

    return new Promise((resolve, reject) => {
      axiosMethod
        .put(url, body, attributes)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          handleError(err, reject);
        });
    });
  };

  const methodDelete = async (url: string, params?: any) => {
    const attributes = { headers: await getHeaders(), params };
    return new Promise((resolve, reject) => {
      axiosMethod
        .delete(url, attributes)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          handleError(err, reject);
        });
    });
  };

  const methodUpload = async (url: string, body: any) => {
    const attributes = {
      // cache: true,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    return new Promise((resolve, reject) => {
      axiosMethod
        .post(url, body, attributes)
        .then((res) => resolve(res.data))
        .catch((err) => handleError(err, reject));
    });
  };

  return {
    methodPost,
    methodGet,
    methodPut,
    methodUpload,
    methodDelete,
  };
};

export default useRequest;
