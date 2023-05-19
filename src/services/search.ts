import { urlApi } from '@/configs/Api';
import useRequest from '@/Hooks/common/useRequest';

const useSearchService = () => {
  const { methodGet } = useRequest();
  const getSearchInfo = (params: any) => {
    return new Promise((resolve, reject) => {
      methodGet(urlApi.searchInfo, params)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  return {
    getSearchInfo,
  };
};

export default useSearchService;
