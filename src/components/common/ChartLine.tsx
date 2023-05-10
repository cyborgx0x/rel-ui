import { useTheme } from '@mui/material/styles';
import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';

import { ISeries } from '@/interfaces/dashBoard';

import BaseOptionChart from '../charts';

interface IProps {
  dataChart?: ISeries[] | undefined;
  date: string[] | undefined;
  colors?: string[] | undefined;
}

export const ChartLine = ({ dataChart, date, colors = undefined }: IProps) => {
  const optionsLine: any = merge(BaseOptionChart(), {
    xaxis: {
      categories: date,
    },
  });

  if (colors) merge(optionsLine, { colors });

  return (
    <ReactApexChart
      options={optionsLine}
      series={dataChart ?? [{ name: 'Không có dữ liệu', data: [] }]}
      type="line"
      height={600}
    />
  );
};
