import { useState } from 'react';
import * as React from 'react';

import { Stack, TextField, Button, Box, FormControl, MenuItem, Select, Link } from '@mui/material';
import Paper from '@mui/material/Paper';
import { SelectChangeEvent } from '@mui/material/Select';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import * as _ from 'lodash';

import icNotFound from '@/assets/image/ic_not_found.png';
import useSearch from '@/Hooks/useSearch';

export interface DataSearch {
  Gender: string;
  PCI: string;
  FullName: string;
  Birthday: string;
  Address: string;
  Email: string;
  PhoneNum: string;
  Facebook: string;
  Username: string;
}
const SearchName = () => {
  const [valueSearch, setValueSearch] = useState('');
  const [isShow, setShow] = useState(false);
  const [data, setData] = useState<DataSearch[]>([]);

  const { handleSearchInfo } = useSearch();
  const handleKeyDown = (event: { keyCode: number }) => {
    if (event.keyCode === 13) {
      handleSearch();
    }
  };
  const [typeSearch, setTypeSearch] = useState('phone:');

  const handleChange = (event: SelectChangeEvent) => {
    setTypeSearch(event.target.value as string);
  };
  const handleSearch = async () => {
    const dataRes = (await handleSearchInfo(`${typeSearch}${valueSearch}`)) as DataSearch[];
    setData(dataRes);
    setShow(true);
  };
  return (
    <>
      <Stack direction="row" style={{ marginTop: 40 }}>
        <FormControl sx={{ minWidth: 140 }}>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={typeSearch}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
            onChange={handleChange}
          >
            <MenuItem value="phone:">Phone</MenuItem>
            <MenuItem value="email:">Email</MenuItem>
            <MenuItem value="facebook_id:">Id Facebook</MenuItem>
            <MenuItem value="pci:">pci</MenuItem>
            <MenuItem value="username:">User Name</MenuItem>
          </Select>
        </FormControl>
        <TextField
          fullWidth
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => setValueSearch(event.target.value)}
          value={valueSearch}
          placeholder="Enter phone, email, address, and more..."
          style={{ marginRight: 10, marginLeft: 10 }}
          onKeyDown={handleKeyDown}
        />
        <Button
          variant="contained"
          style={{ textTransform: 'none' }}
          onClick={async () => {
            handleSearch();
          }}
        >
          Search
        </Button>
      </Stack>

      {data.length !== 0 && (
        <TableContainer component={Paper} style={{ marginTop: 30 }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">PII</TableCell>
                <TableCell align="center">Full Name</TableCell>
                <TableCell align="center">Gender</TableCell>
                <TableCell align="center">Birthday</TableCell>
                <TableCell align="center">Address</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">Phone Number</TableCell>
                <TableCell align="center">Facebook</TableCell>
                <TableCell align="center">User Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row.Gender} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  {/* <TableCell component="th" scope="row">
                    {row.Gender}
                  </TableCell> */}
                  <TableCell align="center">{row.PCI}</TableCell>
                  <TableCell align="center">{row.FullName}</TableCell>
                  <TableCell align="center">{row.Gender}</TableCell>
                  <TableCell align="center">{row.Birthday}</TableCell>
                  <TableCell align="center">{row.Address}</TableCell>
                  <TableCell align="center">{row.Email}</TableCell>
                  <TableCell align="center">{row.PhoneNum}</TableCell>
                  <TableCell align="center">
                    <Link
                      component="button"
                      variant="body2"
                      href={row.Facebook}
                      onClick={() => {
                        window.open(row.Facebook, '_blank');
                      }}
                    >
                      {row.Facebook}
                    </Link>
                    {/* <Link to={row.Facebook}>{row.Facebook} tag</Link> */}
                  </TableCell>
                  <TableCell align="center">{row.Username}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {data.length === 0 && isShow && (
        <Stack style={{ marginTop: 100 }} alignItems="center">
          <Box component="img" src={icNotFound} sx={{ width: 100, height: 100 }} />
          <span style={{ color: 'GrayText', fontSize: 20 }}>No data found</span>
        </Stack>
      )}
    </>
  );
};
export default SearchName;
