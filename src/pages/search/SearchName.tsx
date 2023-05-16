import { useState } from 'react';
import * as React from 'react';

import { Stack, TextField, Button, Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import Paper from '@mui/material/Paper';
import { SelectChangeEvent } from '@mui/material/Select';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import icNotFound from '@/assets/image/ic_not_found.png';
import { useSearch } from '@/Hooks/useSearch';

function createData(name: string, calories: string, fat: string, carbs: string, protein: string) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Nguyễn Văn A', '0123456789', 'nguyenVanA@gmail.com', 'số 1 chợ lớn', ''),
  // createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  // createData('Eclair', 262, 16.0, 24, 6.0),
  // createData('Cupcake', 305, 3.7, 67, 4.3),
  // createData('Gingerbread', 356, 16.0, 49, 3.9),
];
const SearchName = () => {
  const [valueSearch, setValueSearch] = useState('');
  const [isShow, setShow] = useState(true);
  const { handleSearchInfo } = useSearch();
  const handleKeyDown = (event: { keyCode: number }) => {
    if (event.keyCode === 13) {
      setShow(!isShow);
    }
  };
  const [typeSearch, setTypeSearch] = useState('phone:');

  const handleChange = (event: SelectChangeEvent) => {
    setTypeSearch(event.target.value as string);
  };
  return (
    <>
      <Stack direction="row" style={{ marginTop: 40 }}>
        <FormControl sx={{ width: 200 }}>
          <InputLabel id="demo-simple-select-label">Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={typeSearch}
            label="typeSearch"
            onChange={handleChange}
          >
            <MenuItem value="phone:">phone</MenuItem>
            <MenuItem value="email:">email</MenuItem>
            <MenuItem value="facebook_id:">facebook_id</MenuItem>
            <MenuItem value="pci:">pci</MenuItem>
            <MenuItem value="username:">username</MenuItem>
          </Select>
        </FormControl>
        <TextField
          fullWidth
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => setValueSearch(event.target.value)}
          value={valueSearch}
          placeholder="Enter phone, email, address, and more..."
          style={{ marginRight: 10 }}
          onKeyDown={handleKeyDown}
        />
        <Button
          variant="contained"
          style={{ textTransform: 'none' }}
          onClick={() => {
            handleSearchInfo(`${typeSearch}${valueSearch}`);
          }}
        >
          Search
        </Button>
      </Stack>
      {isShow ? (
        <TableContainer component={Paper} style={{ marginTop: 30 }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Họ và tên</TableCell>
                <TableCell align="center">Số điện thoại</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">Địa chỉ</TableCell>
                <TableCell align="center">Facebook</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="center">{row.calories}</TableCell>
                  <TableCell align="center">{row.fat}</TableCell>
                  <TableCell align="center">{row.carbs}</TableCell>
                  <TableCell align="center">{row.protein}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Stack style={{ marginTop: 100 }} alignItems="center">
          <Box component="img" src={icNotFound} sx={{ width: 100, height: 100 }} />
          <span style={{ color: 'GrayText', fontSize: 20 }}>Không tìm thấy dữ liệu</span>
        </Stack>
      )}
    </>
  );
};
export default SearchName;
