import { useTheme } from '@mui/material/styles';
import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';

interface IProps {
  dataChart?: number[] | undefined;
  labels?: string[] | undefined;
  colors?: string[] | undefined;
}

export const ChartPie = ({ dataChart, labels = [], colors = undefined }: IProps) => {
  const theme = useTheme();

  const LABEL_TOTAL = {
    show: true,
    label: 'Tổng',
    color: theme.palette.text.secondary,
    ...theme.typography.subtitle2,
  };

  const LABEL_VALUE = {
    offsetY: 8,
    color: theme.palette.text.primary,
    ...theme.typography.h3,
  };

  const options: any = {
    chart: {
      type: 'donut',
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            value: LABEL_VALUE,
            total: LABEL_TOTAL,
          },
        },
      },
    },
    labels,
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
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 300,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
  };

  if (colors) merge(options, { colors });

  return <ReactApexChart type="donut" series={dataChart ?? [0]} options={options} />;
};
