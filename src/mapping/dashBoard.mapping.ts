import { chain, forEach, forIn, groupBy, mapValues, omit, size, sum, sumBy, uniq, uniqBy } from 'lodash';
import moment from 'moment';

import { ApiVersion } from '@/configs/Enums/api';
import { IDataDashBoard, IDepartment, IParamsDB, ISeries, IStatusOT, ITopLeave } from '@/interfaces/dashBoard';

import { BaseMapping } from './base.mapping';

export namespace GetListResponse {
  export interface Root {
    error: boolean;
    status: number;
    data: Data;
  }

  export interface IObjectData {
    year?: number | string;
    month?: number | string;
    day?: number | string;
    week?: number | string;
    department_id?: number | string;
    department_name?: string;
    count: number;
  }

  export interface Data {
    employee_resignations: IObjectData[];
    employee_onboard: IObjectData[];
    employee_leave: IObjectData[];
    employee_late: IObjectData[];
    employee_ot_status: IStatusOT;
    employee_leave_status: IStatusOT;
    employee_leave_top: ITopLeave[];
    employee_ob_resi: IOnboardAndQuitJob[];
    violation_type_top: IViolation[];
  }
  export interface IOnboardAndQuitJob {
    ob_count: number;
    resi_count: number;
    date: string;
  }

  export interface IViolation {
    violation_type: string;
    count_violation: number;
  }
}

const FILTER_STATUS = {
  DAY: 'day',
  WEEK: 'week',
  MONTH: 'month',
  YEAR: 'year',
  CUSTOM: 'custom',
};

const switchStatus = (status: string, value: any, isCustom?: boolean) => {
  switch (status) {
    case 'day':
      return moment(value?.date, 'YYYY-MM-DD').format('DD/MM-YYYY').replace('-', '/');
    case 'week':
      return isCustom
        ? `W${value?.week}/${value?.year}`
        : moment(value?.date, 'YYYY-MM-DD').format('DD/MM-YYYY').replace('-', '/');
    case 'month':
      return isCustom ? `T${value?.month}/${value?.year}` : `W${value?.week}`;
    case 'year':
      return isCustom ? `${value?.year}` : `T${value?.month}`;
    default:
      return moment().format('DD/MM/YYYY');
  }
};

const switchStatusOBandNV = (status: string, value: string, isCustom?: boolean) => {
  switch (status) {
    case 'day':
      return moment(value, 'YYYY-MM-DD').format('DD/MM-YYYY').replace('-', '/');
    case 'week':
      return isCustom ? `W${value}` : moment(value, 'YYYY-MM-DD').format('DD/MM-YYYY').replace('-', '/');
    case 'month':
      return isCustom ? `T${value}` : `W${value}`;
    case 'year':
      return isCustom ? `${value}` : `T${value}`;
    default:
      return moment().format('DD/MM/YYYY');
  }
};

const sortDate = (data: any, status: string, isCustom?: boolean) => {
  switch (status) {
    case 'day':
      return data.sort((a: any, b: any) => moment(a?.date, 'DD-MM-YYYY').unix() - moment(b?.date, 'DD-MM-YYYY').unix());
    case FILTER_STATUS.WEEK:
      return isCustom
        ? data.sort((a: any, b: any) => a?.week - b?.week)
        : data.sort((a: any, b: any) => moment(a?.date, 'DD-MM-YYYY').unix() - moment(b?.date, 'DD-MM-YYYY').unix());
    case FILTER_STATUS.MONTH:
      return isCustom
        ? data.sort((a: any, b: any) => a?.month - b?.month)
        : data.sort((a: any, b: any) => a?.week - b?.week);
    case FILTER_STATUS.YEAR:
      return isCustom
        ? data.sort((a: any, b: any) => a?.year - b?.year)
        : data.sort((a: any, b: any) => a?.month - b?.month);
    default:
      break;
  }
};

const convertData = (data: GetListResponse.IObjectData[], status: string, isCustom: boolean, listDate: string[]) => {
  const grouped = mapValues(groupBy(data, 'department_name'), (arr: GetListResponse.IObjectData[]) =>
    arr.map((car) => omit(car, 'department_name')),
  );
  const newArr: ISeries[] = [];
  forIn(grouped, (value: GetListResponse.IObjectData[], key) => {
    const arrData: number[] = listDate?.map((textDate) => {
      const findValue = value.find((o) => {
        const newDay = switchStatus(status, o, isCustom);
        return newDay === textDate;
      });
      if (!findValue) {
        return 0;
      }
      return findValue?.count ?? 0;
    });

    newArr.push({
      name: key,
      data: arrData,
    });
  });
  return newArr;
};

class GetDashBoardMapping extends BaseMapping<IParamsDB, GetListResponse.Root, IDataDashBoard> {
  protected processMapping(input: GetListResponse.Root, arg: IParamsDB, apiVersion: ApiVersion): IDataDashBoard {
    const { data } = input;
    const { status, departments, from_date: dateForm } = arg;
    const isCustom = !!dateForm;

    const textDateOBvsNV: string[] = [];
    let textDateCustomDM: string[] = [];
    let textDateCustomNP: string[] = [];

    let seriesNP: ISeries[] = [];
    let seriesDM: ISeries[] = [];
    const seriesOBvsNV: ISeries[] = [];

    const dataStatusOT: number[] = [];
    const dataStatusLeave: number[] = [];

    textDateCustomNP = uniq(
      sortDate(data?.employee_leave, status, isCustom).map((item: any) => {
        return switchStatus(status, item, isCustom);
      }),
    );

    textDateCustomDM = uniq(
      sortDate(data?.employee_late, status, isCustom).map((item: any) => {
        return switchStatus(status, item, isCustom);
      }),
    );

    if (departments) {
      if (data.employee_leave) {
        seriesNP = convertData(data.employee_leave, status, isCustom, textDateCustomNP);
      }
      if (data.employee_late) {
        seriesDM = convertData(data.employee_leave, status, isCustom, textDateCustomNP);
      }
    } else {
      if (data.employee_leave) {
        seriesNP.push({
          name: 'Tổng',
          data: data.employee_leave.map((i) => {
            return i.count;
          }),
        });
      }
      if (data.employee_late) {
        seriesDM.push({
          name: 'Tổng',
          data: data.employee_late.map((i) => {
            return i.count;
          }),
        });
      }
    }

    data.employee_ot_status &&
      forIn(data.employee_ot_status, (value: number | undefined, key: string) => {
        dataStatusOT.push(value ?? 0);
      });
    data.employee_leave_status &&
      forIn(data.employee_leave_status, (value: number | undefined, key: string) => {
        dataStatusLeave.push(value ?? 0);
      });

    if (data.employee_ob_resi) {
      const dataOb: number[] = [];
      const dataNV: number[] = [];
      forEach(data.employee_ob_resi, (value: GetListResponse.IOnboardAndQuitJob, key) => {
        textDateOBvsNV.push(switchStatusOBandNV(status, value.date, isCustom));
        dataOb.push(value.ob_count ?? 0);
        dataNV.push(value.resi_count ?? 0);
      });
      seriesOBvsNV.push({ name: 'Onboard', data: dataOb }, { name: 'Nghỉ việc', data: dataNV });
    }

    const chartData: IDataDashBoard = {
      employee_leave: {
        total: sumBy(data.employee_leave, 'count'),
        date: textDateCustomNP,
        dataChart: seriesNP,
      },
      employee_late: {
        total: sumBy(data.employee_late, 'count'),
        date: textDateCustomDM,
        dataChart: seriesDM,
      },
      employee_ot_status: dataStatusOT,
      employee_leave_status: dataStatusLeave,
      employee_leave_top: data.employee_leave_top,
      employee_ob_resi: {
        totalOB: sumBy(data.employee_ob_resi, 'ob_count'),
        totalNV: sumBy(data.employee_ob_resi, 'resi_count'),
        date: textDateOBvsNV,
        dataChart: seriesOBvsNV,
      },
      violation_type_top: data.violation_type_top,
    };
    return chartData;
  }

  protected readonly supportApiVersions: ApiVersion[] = ['v1'];
}

export namespace GetListResponseDepart {
  export interface Root {
    error: boolean;
    status: number;
    data: Data[];
  }
  export interface Data {
    name: string;
    id: number;
  }
}

class GetDepartment extends BaseMapping<{}, GetListResponseDepart.Root, IDepartment[]> {
  protected processMapping(input: GetListResponseDepart.Root, arg: {}, apiVersion: ApiVersion): IDepartment[] {
    return input.data;
  }

  protected readonly supportApiVersions: ApiVersion[] = ['v1'];
}

const getDashBoardMapping = new GetDashBoardMapping();
const getDepartMapping = new GetDepartment();

export { getDashBoardMapping, getDepartMapping };
