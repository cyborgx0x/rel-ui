import * as React from 'react';

import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  Card,
  Box,
  RadioGroup,
  FormControl,
  Radio,
  FormControlLabel,
  Divider,
  Checkbox,
  TextField,
  Autocomplete,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { TransitionProps } from '@mui/material/transitions';
import vi from 'date-fns/locale/vi';
import { size } from 'lodash';
import moment from 'moment';
import { DateRangePicker, createStaticRanges, defaultInputRanges } from 'react-date-range';

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { IDepartment } from '@/interfaces/dashBoard';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
const top100Films = [
  { id: 12, name: 'Dev1' },
  { id: 8, name: 'Dev2' },
  { id: 40, name: 'Dev3' },
  { id: 4, name: 'Dev4' },
];
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface IProps {
  open: boolean;
  onClose: any;
  onAction: any;
  listDepartment: IDepartment[] | undefined;
}

interface IDate {
  startDate?: Date | undefined;
  endDate?: Date | undefined;
  key?: string;
}

const CalendarCustom = ({ open, onClose, onAction, listDepartment, ...other }: IProps) => {
  const theme = useTheme();
  const defaultDate = {
    startDate: moment().toDate(),
    endDate: moment().toDate(),
    key: 'selection',
  };
  const [state, setState] = React.useState<IDate>(defaultDate);
  const [valueRadio, setValueRadio] = React.useState('day');
  const [departments, setDepartments] = React.useState<Array<string>>([]);

  const sideBar: Array<any> = [
    {
      label: 'Hôm nay',
      range: () => ({
        startDate: moment().toDate(),
        endDate: moment().toDate(),
      }),
    },
    {
      label: 'Tuần này',
      range: () => ({
        startDate: moment().startOf('week').toDate(),
        endDate: moment().endOf('week').toDate(),
      }),
    },
    {
      label: 'Tuần trước',
      range: () => ({
        startDate: moment().subtract(1, 'week').startOf('week').toDate(),
        endDate: moment().subtract(1, 'week').endOf('week').toDate(),
      }),
    },
    {
      label: 'Tháng này',
      range: () => ({
        startDate: moment().startOf('month').toDate(),
        endDate: moment().endOf('month').toDate(),
      }),
    },
    {
      label: 'Tháng trước',
      range: () => ({
        startDate: moment().subtract(1, 'month').startOf('month').toDate(),
        endDate: moment().subtract(1, 'month').endOf('month').toDate(),
      }),
    },
    {
      label: 'Năm nay',
      range: () => ({
        startDate: moment().startOf('year').toDate(),
        endDate: moment().endOf('year').toDate(),
      }),
    },
    {
      label: 'Năm trước',
      range: () => ({
        startDate: moment().subtract(1, 'year').startOf('year').toDate(),
        endDate: moment().subtract(1, 'year').endOf('year').toDate(),
      }),
    },
  ];

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueRadio((event.target as HTMLInputElement).value);
  };
  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={onClose}
        aria-describedby="alert-dialog-slide-description"
        fullWidth={true}
        maxWidth="md"
        {...other}
      >
        <DialogTitle>Tuỳ chỉnh</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box>
              <DateRangePicker
                onChange={(item) => setState(item.selection)}
                className={theme.palette.mode === 'dark' ? 'tinh-custom' : 'tinh-custom-light'}
                moveRangeOnFirstSelection={false}
                preventSnapRefocus={true}
                calendarFocus="backwards"
                months={2}
                ranges={[state]}
                direction="horizontal"
                locale={vi}
                rangeColors={['rgb(61 135 195 / 64%)']}
                staticRanges={createStaticRanges(sideBar)}
                inputRanges={[
                  {
                    ...defaultInputRanges[0],
                    label: 'Ngày cho đến hôm nay',
                  },
                  {
                    ...defaultInputRanges[1],
                    label: 'Ngày bắt đầu từ hôm nay',
                  },
                ]}
              />
            </Box>
          </Box>
          <Divider />
          <Box
            sx={{
              width: '100%',
              textAlign: 'center',
              paddingY: 2,
            }}
          >
            <FormControl>
              <RadioGroup
                value={valueRadio}
                onChange={handleChange}
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel value="day" control={<Radio />} label="Ngày" />
                <FormControlLabel value="week" control={<Radio />} label="Tuần" />
                <FormControlLabel value="month" control={<Radio />} label="Tháng" />
                <FormControlLabel value="year" control={<Radio />} label="Năm" />
              </RadioGroup>
            </FormControl>
          </Box>
          <Box sx={{ width: '100%' }}>
            <Autocomplete
              fullWidth
              multiple
              id="checkboxes-tags-demo"
              onChange={(event: React.SyntheticEvent, newValue: IDepartment[]) => {
                if (size(newValue) > 0) {
                  const newArr = newValue.map((i) => {
                    return String(i.id);
                  });
                  setDepartments(newArr);
                } else {
                  setDepartments([]);
                }
              }}
              options={listDepartment || [{ name: '', id: '' }]}
              disableCloseOnSelect
              getOptionLabel={(option) => option?.name}
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} />
                  {option?.name}
                </li>
              )}
              renderInput={(params) => <TextField {...params} label="Phòng ban" placeholder="Chọn phòng ban" />}
            />
          </Box>
        </DialogContent>
        <DialogActions style={{ paddingRight: 26 }}>
          <Button
            variant="outlined"
            color="error"
            onClick={() => {
              onClose();
            }}
          >
            Đóng
          </Button>
          <Button
            variant="outlined"
            color="success"
            onClick={() => {
              onAction({
                from_date: moment(state.startDate).format('YYYY-MM-DD'),
                to_date: moment(state.endDate).format('YYYY-MM-DD'),
                departments: size(departments) > 0 ? JSON.stringify(departments) : undefined,
                status: valueRadio,
              });
              onClose();
            }}
          >
            Áp Dụng
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CalendarCustom;
