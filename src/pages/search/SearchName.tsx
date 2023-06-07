import { useState } from 'react';
import * as React from 'react';

import { Stack, TextField, Button, Box, FormControl, MenuItem, Select } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import * as _ from 'lodash';

import icNotFound from '@/assets/image/ic_not_found.png';
import ItemRow from '@/components/common/ItemRow';
import useSearch from '@/Hooks/useSearch';

export interface DataSearch {
  Gender: string;
  PII: string;
  FullName: string;
  Birthday: string;
  Address: string;
  Email: string;
  PhoneNum: string;
  Facebook: string;
  Username: string;
  TypeVehicle: string;
  Plate: string;
}
const SearchName = () => {
  const [valueSearch, setValueSearch] = useState('');
  const [isShow, setShow] = useState(false);
  const [data, setData] = useState<DataSearch>({} as DataSearch);
  const { Gender, PII, FullName, Birthday, Address, Email, PhoneNum, Facebook, Username, TypeVehicle, Plate } = data;
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
    const dataRes = (await handleSearchInfo(`${typeSearch}${valueSearch}`)) as DataSearch;
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
            <MenuItem value="pii:">PII</MenuItem>
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
      {!_.isEmpty(data) && (
        <Box boxShadow={10} borderRadius={2} width="100%" marginTop={4}>
          <ItemRow title="PII" content={PII} />
          <ItemRow title="Full Name" content={FullName} />
          <ItemRow title="Gender" content={Gender} />
          <ItemRow title="Birthday" content={Birthday} />
          <ItemRow title="Address" content={Address} />
          <ItemRow title="Email" contentLink={Email} isEmail={true} />
          <ItemRow title="Phone Number" content={PhoneNum} />
          <ItemRow title="Facebook" contentLink={Facebook} />
          <ItemRow title="User Name" content={Username} />
          <ItemRow title="Plate" content={Plate} />
          <ItemRow title="Type Vehicle" content={TypeVehicle} />
        </Box>
      )}

      {_.isEmpty(data) && isShow && (
        <Stack style={{ marginTop: 100 }} alignItems="center">
          <Box component="img" src={icNotFound} sx={{ width: 100, height: 100 }} />
          <span style={{ color: 'GrayText', fontSize: 20 }}>No data found</span>
        </Stack>
      )}
    </>
  );
};
export default SearchName;
