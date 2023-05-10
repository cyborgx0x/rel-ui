import {
  useGetDashBoardQuery,
  useGetDepartmentQuery,
  useLazyGetDashBoardQuery,
  useLazyGetDepartmentQuery,
} from '@/api/dashBoard';
import { httpStatus } from '@/configs/Enums/httpStatus';
import useAuth from '@/Hooks/useAuth';
import { IParamsDB } from '@/interfaces/dashBoard';

export namespace dashBoardService {
  export const useDashBoard = (params: IParamsDB) => {
    return useGetDashBoardQuery(params);
  };
  export const useLazyDashBoard = () => {
    const { logout } = useAuth();

    const [getDashBoard, { data, error }] = useLazyGetDashBoardQuery();
    const newErr: any = error;
    if (newErr?.status === httpStatus.StatusUnauthorized) {
      logout();
    }
    return { getDashBoard, data };
  };

  export const useDepartment = () => {
    const { logout } = useAuth();
    const { data, error } = useGetDepartmentQuery({});

    const newErr: any = error;
    if (newErr?.status === httpStatus.StatusUnauthorized) {
      logout();
    }

    return data;
  };

  export const useLazyDepartment = () => {
    const { logout } = useAuth();

    const [getDepartment, { data, error }] = useLazyGetDepartmentQuery();
    const newErr: any = error;
    if (newErr?.status === httpStatus.StatusUnauthorized) {
      logout();
    }
    return { getDepartment, data };
  };
}
