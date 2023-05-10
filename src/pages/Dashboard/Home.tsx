import React, { useEffect, useState } from 'react';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {
  Typography,
  Card,
  Box,
  Grid,
  ToggleButtonGroup,
  ToggleButton,
  Stack,
  Menu,
  MenuItem,
  Button,
} from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import { styled } from '@mui/material/styles';
import { size } from 'lodash';
import moment from 'moment';

import EmployeeImage from '@/assets/image/employee.png';
import LateImage from '@/assets/image/late.png';
import OnBoardImage from '@/assets/image/onBoard.png';
import QuitJobImage from '@/assets/image/quitJob.png';
import { ChartBar } from '@/components/common/ChartBar';
import { ChartLine } from '@/components/common/ChartLine';
import { ChartPie } from '@/components/common/ChartPie';
import CustomTable, { IColumns } from '@/components/common/CustomTable';
import CalendarCustom from '@/components/modalSearchDate/DialogAnimate';
import { IDataDashBoard, IDepartment, IParamsDB, ITopLeave, IViolation } from '@/interfaces/dashBoard';
import { fNumber } from '@/utils/function';

interface ICardData {
  background: string;
  color: string;
  image: string;
  title: string;
  dataNumber: number | undefined;
}

interface IProps {
  params: IParamsDB;
  setParams: (value: IParamsDB) => void;
  listDepartment: IDepartment[] | undefined;
  alignment: string | null;
  setAlignment: (value: string | null) => void;
  expanded: string | false;
  setExpanded: (value: string | false) => void;
  dataChartDB: IDataDashBoard | undefined;
  menuChart: null | HTMLElement;
  setMenuChart: (value: null | HTMLElement) => void;
  keyChart: string;
  setKeyChart: (value: string) => void;
}

const Home = ({
  params,
  setParams,
  listDepartment,
  alignment,
  setAlignment,
  expanded,
  setExpanded,
  dataChartDB,
  menuChart,
  setMenuChart,
  keyChart,
  setKeyChart,
}: IProps) => {
  const [isModalDate, setIsModalDate] = useState<boolean>(false);
  const [checkCustom, setCheckCustom] = useState<boolean>(false);

  const openChart = Boolean(menuChart);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenuChart(event.currentTarget);
  };
  const handleClose = () => {
    setMenuChart(null);
  };

  const handleSetActiveChart = (key: string) => {
    setMenuChart(null);
    setKeyChart(key);
  };
  const handleAlignment = (event: React.MouseEvent<HTMLElement>, newAlignment: string | null) => {
    if (newAlignment !== null) {
      if (newAlignment !== 'custom') {
        const newParams = {
          from_date: undefined,
          to_date: undefined,
          departments: undefined,
          status: newAlignment,
        };
        setParams(newParams);
        setCheckCustom(false);
      } else {
        setCheckCustom(true);
        setIsModalDate(true);
      }
      setAlignment(newAlignment);
    } else if (checkCustom) {
      setIsModalDate(true);
    }
  };

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleSelectDate = async (values: IParamsDB) => {
    setParams(values);
  };

  const handleCloseModal = () => setIsModalDate(false);

  const CardData = ({ background, color, image, title, dataNumber }: ICardData) => {
    return (
      <Card
        sx={{
          width: '100%',
          background,
          paddingX: 2,
          paddingY: 2,
        }}
      >
        <Grid container alignItems="center" spacing={{ xs: 1, xl: 2 }}>
          <Grid item>
            <Box
              component="img"
              sx={{
                maxHeight: { xs: 32 },
                maxWidth: { xs: 32 },
              }}
              src={image}
            />
          </Grid>
          <Grid item>
            <Typography
              sx={{
                fontSize: { xs: 11, sm: 14, md: 18 },
                color,
                paddingTop: '3px',
              }}
            >
              {title}
            </Typography>
          </Grid>
        </Grid>
        <Grid container justifyContent="flex-end" paddingTop={1}>
          <Typography
            sx={{
              fontSize: { sx: 20, sm: 20, md: 34 },
            }}
          >
            {fNumber(dataNumber ?? 0)}
          </Typography>
        </Grid>
      </Card>
    );
  };

  const columns: IColumns<ITopLeave>[] = [
    {
      title: 'TOP',
      dataIndex: 'top',
      align: 'center',
      width: '20%',
      render(item, index) {
        return index + 1;
      },
    },
    {
      title: 'Nhân viên',
      dataIndex: 'employee',
      render(item, index) {
        return item.name;
      },
    },
    {
      title: 'Số lần',
      dataIndex: 'total',
      align: 'center',
      width: '20%',
      render(item, index) {
        return item.count;
      },
    },
    {
      title: 'Số ngày',
      dataIndex: 'date',
      align: 'center',
      width: '20%',
      render(item, index) {
        return item.total_time;
      },
    },
  ];

  const columnsViolation: IColumns<IViolation>[] = [
    {
      title: 'STT',
      dataIndex: 'top',
      align: 'center',
      width: '20%',
      render(item, index) {
        return index + 1;
      },
    },
    {
      title: 'Loại vi phạm',
      dataIndex: 'type',
      render(item, index) {
        return item.violation_type;
      },
    },
    {
      title: 'Số lần',
      dataIndex: 'total',
      align: 'center',
      width: '20%',
      render(item, index) {
        return item.count_violation;
      },
    },
  ];

  const convertDate = (date: IParamsDB) => {
    if (date.from_date)
      return `ngày ${moment(date.from_date).format('DD/MM/YYYY')} đến ${moment(date.to_date).format('DD/MM/YYYY')}`;

    switch (date.status) {
      case 'week':
        return `ngày ${moment().startOf('week').format('DD/MM/YYYY')} đến ${moment()
          .endOf('week')
          .format('DD/MM/YYYY')}`;
      case 'month':
        return `ngày ${moment().startOf('month').format('DD/MM/YYYY')} đến ${moment()
          .endOf('month')
          .format('DD/MM/YYYY')}`;
      case 'year':
        return `ngày ${moment().startOf('year').format('DD/MM/YYYY')} đến ${moment()
          .endOf('year')
          .format('DD/MM/YYYY')}`;

      default:
        return `ngày ${moment().format('DD/MM/YYYY')} `;
    }
  };

  const renderChart = (key: string) => {
    switch (key) {
      case 'XN':
        return <ChartBar dataChart={dataChartDB?.employee_leave.dataChart} date={dataChartDB?.employee_leave.date} />;
      case 'OB_NV':
        return (
          <ChartLine
            dataChart={dataChartDB?.employee_ob_resi.dataChart}
            date={dataChartDB?.employee_ob_resi.date}
            colors={['#0000ff', '#ff0000']}
          />
        );
      case 'STATUS':
        return (
          <Grid container height={612} alignItems="center">
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <Typography fontSize={{ xs: 20, sm: 14, md: 14, lg: 16 }} sx={{ textAlign: 'center', color: '#898989' }}>
                Xin nghỉ
              </Typography>
              <ChartPie
                dataChart={dataChartDB?.employee_leave_status}
                labels={['Chờ duyệt', 'Đã duyệt', 'Từ chối']}
                colors={['#FF9A00', '#00C100', '#D60202']}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <Typography fontSize={{ xs: 20, sm: 14, md: 14, lg: 16 }} sx={{ textAlign: 'center', color: '#898989' }}>
                Làm thêm giờ
              </Typography>
              <ChartPie
                dataChart={dataChartDB?.employee_ot_status}
                labels={['Chờ duyệt', 'Đang duyệt', 'Đã duyệt', 'Từ chối']}
                colors={['#FF9A00', '#9B88ED', '#00C100', '#D60202']}
              />
            </Grid>
          </Grid>
        );
      case 'DM':
        return <ChartBar dataChart={dataChartDB?.employee_late.dataChart} date={dataChartDB?.employee_late.date} />;
      default:
        return <ChartBar dataChart={dataChartDB?.employee_leave.dataChart} date={dataChartDB?.employee_leave.date} />;
    }
  };

  const renderNameChart = (key: string) => {
    switch (key) {
      case 'XN':
        return 'Thống kê số lượng đăng ký xin nghỉ';
      case 'OB_NV':
        return 'Thông kê nhân sự onboard và nghỉ việc';
      case 'STATUS':
        return 'Thống kê xin nghỉ, làm thêm giờ theo trạng thái';
      case 'DM':
        return 'Thống kê đi muộn';
      default:
        return 'Thống kê số lượng đăng ký xin nghỉ';
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={12} md={6}>
          <CustomToggleButtonGroup
            size="small"
            color="primary"
            value={alignment}
            exclusive
            onChange={handleAlignment}
            aria-label="Platform"
            fullWidth
          >
            <CustomToggleButton sx={{ borderRadius: 16 }} value="day">
              Ngày
            </CustomToggleButton>
            <CustomToggleButton value="week">Tuần</CustomToggleButton>
            <CustomToggleButton value="month">Tháng</CustomToggleButton>
            <CustomToggleButton value="year">Năm</CustomToggleButton>
            <CustomToggleButton sx={{ borderRadius: 16 }} value="custom">
              Tùy chỉnh
            </CustomToggleButton>
          </CustomToggleButtonGroup>
        </Grid>
      </Grid>
      <Box sx={{ textAlign: 'center', paddingY: 1 }}>
        <Typography fontSize={{ xs: 12, md: 14 }} fontWeight={500} color="rgb(145, 158, 171);">
          {convertDate(params)}
        </Typography>
      </Box>
      <Grid container spacing={{ xs: 1, md: 2 }}>
        <Grid item xs={12} sm={12} md={12} lg={8} container>
          <Stack direction={{ xs: 'column' }} width="100%">
            <Grid container columnSpacing={{ xs: 1, md: 2 }}>
              <Grid item xs={3}>
                <CardData
                  background="linear-gradient(180deg, #FEF3EF 0%, #FFFFFF 100%)"
                  color="#F77E61"
                  title="Nghỉ phép"
                  dataNumber={dataChartDB?.employee_leave.total}
                  image={EmployeeImage}
                />
              </Grid>
              <Grid item xs={3}>
                <CardData
                  background="linear-gradient(180deg, #EDF8FE 0%, rgba(237, 248, 254, 0) 100%)"
                  color="#39A1EA"
                  title="Onboard"
                  dataNumber={dataChartDB?.employee_ob_resi.totalOB}
                  image={OnBoardImage}
                />
              </Grid>
              <Grid item xs={3}>
                <CardData
                  background="linear-gradient(180deg, #EDF7F6 0%, rgba(255, 255, 255, 0) 100%)"
                  color="#29AB91"
                  title="Nghỉ việc"
                  dataNumber={dataChartDB?.employee_ob_resi.totalNV}
                  image={QuitJobImage}
                />
              </Grid>
              <Grid item xs={3}>
                <CardData
                  background="linear-gradient(180deg, #FFF8F0 0%, rgba(255, 255, 255, 0) 100%)"
                  color="#FEB557"
                  title="Đi muộn"
                  dataNumber={dataChartDB?.employee_late.total}
                  image={LateImage}
                />
              </Grid>
            </Grid>
            <Grid paddingTop={{ xs: 1, md: 2 }} sx={{ width: '100%' }}>
              <Card sx={{ padding: 2, width: '100%' }}>
                <Button
                  id="basic-button"
                  aria-controls={openChart ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={openChart ? 'true' : undefined}
                  onClick={handleClick}
                  sx={{
                    textTransform: 'initial',
                  }}
                  endIcon={<KeyboardArrowDownIcon />}
                >
                  <Typography sx={{ fontWeight: 600, fontSize: 20 }}>{renderNameChart(keyChart)}</Typography>
                </Button>
                {renderChart(keyChart)}
              </Card>
              {/* <Accordion
                expanded={expanded === 'panel1'}
                onChange={handleChange('panel1')}
                sx={{
                  boxShadow: '0px 4px 20px rgba(22, 20, 95, 0.15)',
                  borderRadius: 1,
                  border: 'none',
                  marginBottom: { xs: 1, md: 2 },
                  '&:before': {
                    display: 'none',
                  },
                }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
                  <Typography sx={{ flexShrink: 0, fontSize: 20, textAlign: 'center' }}>
                    Thống kê số lượng đăng ký xin nghỉ
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <ChartBar dataChart={dataChartDB?.employee_leave.dataChart} date={dataChartDB?.employee_leave.date} />
                </AccordionDetails>
              </Accordion>
              <Accordion
                expanded={expanded === 'panel2'}
                onChange={handleChange('panel2')}
                sx={{
                  boxShadow: '0px 4px 20px rgba(22, 20, 95, 0.15)',
                  borderRadius: 1,
                  marginBottom: { xs: 1, md: 2 },

                  border: 'none',
                  '&:before': {
                    display: 'none',
                  },
                }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2bh-content" id="panel2bh-header">
                  <Typography sx={{ flexShrink: 0, fontSize: 20, textAlign: 'center' }}>
                    Thông kê nhân sự onboard và nghỉ việc
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <ChartLine
                    dataChart={dataChartDB?.employee_ob_resi.dataChart}
                    date={dataChartDB?.employee_ob_resi.date}
                    colors={['#0000ff', '#ff0000']}
                  />
                </AccordionDetails>
              </Accordion>
              <Accordion
                expanded={expanded === 'panel3'}
                onChange={handleChange('panel3')}
                sx={{
                  boxShadow: '0px 4px 20px rgba(22, 20, 95, 0.15)',
                  borderRadius: 1,
                  border: 'none',
                  marginBottom: { xs: 1, md: 2 },

                  '&:before': {
                    display: 'none',
                  },
                }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel3bh-content" id="panel3bh-header">
                  <Typography sx={{ flexShrink: 0, fontSize: 20, textAlign: 'center' }}>
                    Thống kê xin nghỉ, làm thêm giờ theo trạng thái
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container>
                    <Grid item xs={12} sm={6} md={6} lg={6}>
                      <Typography
                        fontSize={{ xs: 20, sm: 14, md: 14, lg: 16 }}
                        sx={{ textAlign: 'center', color: '#898989' }}
                      >
                        Xin nghỉ
                      </Typography>
                      <ChartPie
                        dataChart={dataChartDB?.employee_leave_status}
                        labels={['Chờ duyệt', 'Đã duyệt', 'Từ chối']}
                        colors={['#FF9A00', '#00C100', '#D60202']}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={6}>
                      <Typography
                        fontSize={{ xs: 20, sm: 14, md: 14, lg: 16 }}
                        sx={{ textAlign: 'center', color: '#898989' }}
                      >
                        Làm thêm giờ
                      </Typography>
                      <ChartPie
                        dataChart={dataChartDB?.employee_ot_status}
                        labels={['Chờ duyệt', 'Đang duyệt', 'Đã duyệt', 'Từ chối']}
                        colors={['#FF9A00', '#9B88ED', '#00C100', '#D60202']}
                      />
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
              <Accordion
                expanded={expanded === 'panel4'}
                onChange={handleChange('panel4')}
                sx={{
                  boxShadow: '0px 4px 20px rgba(22, 20, 95, 0.15)',
                  borderRadius: 1,
                  border: 'none',
                  marginBottom: { xs: 1, md: 2 },

                  '&:before': {
                    display: 'none',
                  },
                }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel4bh-content" id="panel4bh-header">
                  <Typography sx={{ flexShrink: 0, fontSize: 20, textAlign: 'center' }}>Thống kê đi muộn</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <ChartBar dataChart={dataChartDB?.employee_late.dataChart} date={dataChartDB?.employee_late.date} />
                </AccordionDetails>
              </Accordion> */}
            </Grid>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={4}>
          <Stack direction={{ xs: 'column' }} spacing={{ xs: 1, md: 2 }}>
            <Card sx={{ padding: 2, width: '100%', height: 405 }}>
              <Typography sx={{ fontSize: 20, textAlign: 'center' }}>Top 5 người xin nghỉ nhiều nhất</Typography>
              {dataChartDB?.employee_leave_top && size(dataChartDB?.employee_leave_top) > 0 ? (
                <CustomTable columns={columns} dataSource={dataChartDB.employee_leave_top.slice(0, 5)} />
              ) : (
                <Typography
                  fontSize={{ xs: 12, md: 14 }}
                  fontWeight={500}
                  color="rgb(145, 158, 171)"
                  textAlign="center"
                >
                  {convertDate(params)} không có người xin nghỉ
                </Typography>
              )}
            </Card>
            <Card sx={{ padding: 2, width: '100%', height: 405 }}>
              <Typography sx={{ fontSize: 20, textAlign: 'center' }}>Thống kê vi phạm</Typography>
              {dataChartDB?.violation_type_top && size(dataChartDB?.violation_type_top) > 0 ? (
                <CustomTable columns={columnsViolation} dataSource={dataChartDB?.violation_type_top.slice(0, 5)} />
              ) : (
                <Typography
                  fontSize={{ xs: 12, md: 14 }}
                  fontWeight={500}
                  color="rgb(145, 158, 171)"
                  textAlign="center"
                >
                  {convertDate(params)} không có vi phạm
                </Typography>
              )}
            </Card>
          </Stack>
        </Grid>
      </Grid>
      <Menu
        id="basic-menu"
        anchorEl={menuChart}
        open={openChart}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem
          onClick={() => {
            handleSetActiveChart('XN');
          }}
          selected={keyChart === 'XN'}
        >
          Thống kê số lượng đăng ký xin nghỉ
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleSetActiveChart('OB_NV');
          }}
          selected={keyChart === 'OB_NV'}
        >
          Thông kê nhân sự onboard và nghỉ việc
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleSetActiveChart('STATUS');
          }}
          selected={keyChart === 'STATUS'}
        >
          {' '}
          Thống kê xin nghỉ, làm thêm giờ theo trạng thái
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleSetActiveChart('DM');
          }}
          selected={keyChart === 'DM'}
        >
          {' '}
          Thống kê đi muộn
        </MenuItem>
      </Menu>
      <CalendarCustom
        open={isModalDate}
        onAction={handleSelectDate}
        onClose={handleCloseModal}
        listDepartment={listDepartment}
      />
    </Box>
  );
};

const CustomToggleButtonGroup = styled(ToggleButtonGroup)({
  borderRadius: 22,
  background: '#FFFFFF',
  boxShadow: '0px 4px 30px rgba(22, 20, 95, 0.15)',
});

const CustomToggleButton = styled(ToggleButton)(({ theme }) => ({
  fontWeight: 700,
  textTransform: 'none',
  border: 'none',
  color: '#8596B8',
  '&.MuiToggleButton-root.Mui-selected': {
    color: '#283F7C',
    backgroundColor: 'transparent',
  },
  [theme.breakpoints.up('xs')]: {
    fontSize: 14,
  },
  [theme.breakpoints.up('sm')]: {
    fontSize: 14,
  },
  [theme.breakpoints.up('md')]: {
    fontSize: 16,
  },
  [theme.breakpoints.up('lg')]: {
    fontSize: 18,
  },
}));

export default React.memo(Home);
