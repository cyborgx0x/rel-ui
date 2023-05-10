import { useTheme } from '@mui/material/styles';
import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';

import { ISeries } from '@/interfaces/dashBoard';

import BaseOptionChart from '../charts';

interface IProps {
  dataChart: ISeries[] | undefined;
  date: string[] | undefined;
}
export const ChartBar = ({ dataChart, date }: IProps) => {
  const theme = useTheme();

  const chartOptions: any = merge(BaseOptionChart(), {
    chart: {
      type: 'bar',
      stacked: true,
    },
    legend: {
      show: true,
      fontSize: 13,
      position: 'bottom',
      horizontalAlign: 'center',
      markers: {
        width: 20,
        radius: 0,
      },
      fontWeight: 500,
      itemMargin: { horizontal: 12 },
      labels: {
        colors: theme.palette.text.primary,
      },
    },
    xaxis: {
      categories: date ?? ['Không có dữ liệu'],
    },
  });
  return (
    <ReactApexChart options={chartOptions} series={dataChart ?? [{ name: '', data: [] }]} type="bar" height={600} />
  );
};
