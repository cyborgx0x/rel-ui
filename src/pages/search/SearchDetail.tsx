import { useState, useEffect } from 'react';
import * as React from 'react';

import { Stack, TextField, Button, Box, FormControl, MenuItem, Select, Typography } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import * as _ from 'lodash';
import { useMediaQuery } from 'react-responsive';

import icNotFound from '@/assets/image/ic_not_found.png';
import ItemRow from '@/components/common/ItemRow';
import useNotify from '@/Hooks/common/useNotify';
import useShowModalLoginGmail from '@/Hooks/common/useShowModalLoginGmail';
import useSearch from '@/Hooks/useSearch';
import { DataSearch } from '@/interfaces/personInfo';

import SearchPersonInfo from '../PersonInfo/PersonInfo';
import { sampleData } from '../PersonInfo/PersonInfoAnonymous';


const SearchDetail = () => {
  const { onNotify } = useNotify();
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const handleRemainToken = async () => {
    const remainToken = await getRemainToken();
    setRemainToken(remainToken);
  };
  const accessToken = localStorage.getItem('serviceToken') || '';
  useEffect(() => {
    accessToken && handleRemainToken();
  }, [accessToken]);

  const [data, setData] = useState<DataSearch>({} as DataSearch);

  const [remainToken, setRemainToken] = useState<number | string>(0);

  const { setShowModalLoginGmail } = useShowModalLoginGmail();

  const [valueSearch, setValueSearch] = useState('');
  const [isShow, setShow] = useState(false);

  const { handleSearchInfo, getRemainToken } = useSearch();
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
    if (!accessToken) {
      setData(sampleData)
      onNotify('info', 'Hiển thị thông tin mẫu, vui lòng đăng nhập để xem chi tiết');
    } else {

      let valueSearchConvert = valueSearch;
      if (typeSearch === 'phone:' && valueSearch.split('')[0] === '0') {
        const partAfterValue = valueSearch.slice(1, valueSearch.length);
        valueSearchConvert = `84${partAfterValue}`;
      }
      const dataRes = (await handleSearchInfo(`${typeSearch}${valueSearchConvert}`)) as DataSearch;
      setData(dataRes);
      setRemainToken(dataRes.remaining);
      setShow(true);
    }
  };

  return (
    <>
      <Stack
        direction="column"
        style={
          isMobile
            ? {
              marginTop: !isShow ? 40 : 40,
              marginLeft: !isShow ? 10 : 0,
              marginRight: !isShow ? 10 : 0,
            }
            : {
              marginTop: !isShow ? 120 : 40,
              marginLeft: !isShow ? 100 : 0,
              marginRight: !isShow ? 100 : 0,
            }
        }
      >
        {!isShow && (
          <Typography
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontWeight: 'bolder',
              color: 'Highlight',
              fontSize: isMobile ? 40 : 80,
            }}
          >
            WIBU
          </Typography>
        )}

        <Stack direction="row">
          <FormControl
            sx={{
              minWidth: 140,
              '@media (max-width: 767px)': {
                minWidth: 120,
              },
            }}
          >
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
            sx={{
              '@media (max-width: 767px)': {
                minWidth: 150,
              },
            }}
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
        {accessToken && (
          <Typography
            fontSize={{ xs: isMobile ? 16 : 20, sm: 14, md: 14, lg: 16 }}
            sx={{ color: 'black', fontWeight: '600', marginTop: 1, marginLeft: isMobile ? 16 : 20 }}
          >
            {`Number request remain: ${remainToken}`}
          </Typography>
        )}
      </Stack>
      {!_.isEmpty(data) && (
        <Box width="100%" marginTop={4}>
          {accessToken ? (
            <SearchPersonInfo dataRes={data} />
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
              <SearchPersonInfo dataRes={sampleData} />
            </Box>
          )}
        </Box>
      )}

      {
        _.isEmpty(data) && isShow && (
          <Stack style={{ marginTop: 100 }} alignItems="center">
            <Box component="img" src={icNotFound} sx={{ width: 100, height: 100 }} />
            <span style={{ color: 'GrayText', fontSize: 20 }}>No data found</span>
          </Stack>
        )
      }
    </>
  );
};
export default SearchDetail;
