import { baseApi } from '@/configs/Api/baseApi';
import { IDataDashBoard, IParamsDB, IDepartment } from '@/interfaces/dashBoard';
import { getDashBoardMapping, getDepartMapping } from '@/mapping/dashBoard.mapping';

const dashBoardRestApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashBoard: builder.query<IDataDashBoard, IParamsDB>({
      query: (params) => ({
        url: 'report-dashboard',
        method: 'GET',
        params,
      }),
      transformResponse: getDashBoardMapping.transformRTKResponse,
    }),
    getDepartment: builder.query<IDepartment[], {}>({
      query: (params) => ({
        url: 'departments',
        method: 'GET',
        params,
      }),
      transformResponse: getDepartMapping.transformRTKResponse,
    }),
  }),
});

export const { useGetDashBoardQuery, useLazyGetDashBoardQuery, useGetDepartmentQuery, useLazyGetDepartmentQuery } =
  dashBoardRestApi;
