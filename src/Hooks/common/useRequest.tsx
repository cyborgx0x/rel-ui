import axios from 'axios';
import * as _ from 'lodash';

import useLoading from './useLoading';
import useShowModal from './useShowModal';

const TIME_OUT = 15000;

const useRequest = () => {
  const axiosMethod = axios;
  axiosMethod.defaults.timeout = TIME_OUT;
  // const { updateUserToken } = useUser();
  const { setShowModal } = useShowModal();
  const { setLoading } = useLoading();
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
      setShowModal({ isShow: true, content: 'End of login session' });
    } else if (err?.message === 'Network Error') {
      setShowModal({ isShow: true, content: err?.message });
    } else if (err?.message?.includes('timeout')) {
      setShowModal({ isShow: true, content: err?.message });
    } else if (err?.message?.includes('500') || err?.message?.includes('502') || err?.message?.includes('503')) {
      setShowModal({ isShow: true, content: 'Server error' });
    } else {
      setShowModal({ isShow: true, content: err?.message });
    }

    return reject(err);
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
