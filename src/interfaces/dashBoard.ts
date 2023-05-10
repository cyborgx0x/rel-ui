export interface IParamsDB {
  from_date?: string | undefined;
  to_date?: string | undefined;
  departments?: string | undefined;
  status: string;
}
export interface ISeries {
  name: string;
  data: number[];
}
export interface IObEmployee {
  total: number;
  date: string[];
  dataChart: ISeries[];
}
export interface IObAndNv {
  totalOB: number;
  totalNV: number;
  date: string[];
  dataChart: ISeries[];
}
export interface IStatusOT {
  approved: number;
  process: number;
  rejected?: number;
  waiting: number;
}
export interface IDataDashBoard {
  employee_leave: IObEmployee;
  employee_late: IObEmployee;
  employee_ot_status: number[];
  employee_leave_status: number[];
  employee_leave_top: ITopLeave[];
  employee_ob_resi: IObAndNv;
  violation_type_top: IViolation[];
}

export interface IViolation {
  violation_type: string;
  count_violation: number;
}

export interface IDepartment {
  id: number | string;
  name: string;
}
export interface ITopLeave {
  account: string;
  count: number;
  total_time: number;
  employee_id?: number;
  name: string;
}
