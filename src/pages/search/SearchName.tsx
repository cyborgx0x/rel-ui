import { useState } from 'react';
import * as React from 'react';

import { Stack, TextField, Button, Box, FormControl, MenuItem, Select, Container, Typography } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import * as _ from 'lodash';

import icNotFound from '@/assets/image/ic_not_found.png';
import ItemRow from '@/components/common/ItemRow';
import useShowModalLoginGmail from '@/Hooks/common/useShowModalLoginGmail';
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
  const accessToken = localStorage.getItem('serviceToken');
  const { setShowModalLoginGmail } = useShowModalLoginGmail();
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
    let valueSearchConvert = valueSearch;
    if (typeSearch === 'phone:' && valueSearch.split('')[0] === '0') {
      const partAfterValue = valueSearch.slice(1, valueSearch.length);
      valueSearchConvert = `84${partAfterValue}`;
    }
    const dataRes = (await handleSearchInfo(`${typeSearch}${valueSearchConvert}`)) as DataSearch;
    setData(dataRes);
    setShow(true);
  };
  return (
    <>
      <Stack
        direction="column"
        style={{ marginTop: !isShow ? 120 : 40, marginLeft: !isShow ? 100 : 0, marginRight: !isShow ? 100 : 0 }}
      >
        {!isShow && (
          <Typography
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontWeight: 'bolder',
              color: 'Highlight',
              fontSize: 80,
            }}
          >
            WIBU
          </Typography>
        )}

        <Stack direction="row">
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
      </Stack>
      {!_.isEmpty(data) && (
        <Box boxShadow={10} borderRadius={2} width="100%" marginTop={4}>
          <ItemRow title="PII" content={PII} />
          <ItemRow title="Full Name" content={FullName} />
          {accessToken ? (
            <>
              <ItemRow title="Gender" content={Gender} />
              <ItemRow title="Birthday" content={Birthday} />
              <ItemRow title="Address" content={Address} />
              <ItemRow title="Email" contentLink={Email} isEmail={true} />
              <ItemRow title="Phone Number" content={PhoneNum} />
              <ItemRow title="Facebook" contentLink={Facebook} />
              <ItemRow title="User Name" content={Username} />
              <ItemRow title="Plate" content={Plate} />
              <ItemRow title="Type Vehicle" content={TypeVehicle} />
            </>
          ) : (
            <Box
              sx={{
                color: 'black',
                borderRadius: 2,
                alignItems: 'center',
                justifyContent: 'center',
                display: 'flex',
                flexDirection: 'column',
                marginTop: 2,
              }}
            >
              <Button
                onClick={() => {
                  setShowModalLoginGmail({ isShow: true });
                }}
                variant="text"
                style={{ color: '#0000FF', textTransform: 'none', fontSize: 20 }}
              >
                Login to view full information
              </Button>
            </Box>
          )}
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
