import { size } from 'lodash';

import PATH from '../Enums/api';

// const AUTH_PREFIX = 'api/v1/auth';
const META_PREFIX = 'api/v1';

const HOST = process.env.REACT_APP_URL;

const getBaseUrl = (prefix: any) => {
  return `${HOST}/${prefix}`;
};

export const urlApi = {
  HOST,
  auth: {
    login: `${getBaseUrl(META_PREFIX)}/${PATH.AUTH.LOGIN}`,
    loginGoogle: `${getBaseUrl(META_PREFIX)}/${PATH.AUTH.LOGIN_GOOGLE}`,
  },
  search: `${getBaseUrl(META_PREFIX)}/statistics/attitude/time-based`,
  chartCommunityAttitude: `${getBaseUrl(META_PREFIX)}/statistics/keyword/time-based`,
  searchInfo: `${getBaseUrl(META_PREFIX)}/search`,
};
