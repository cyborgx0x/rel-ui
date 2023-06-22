import { Box, Button, Stack, Typography } from '@mui/material';
import { useHistory } from 'react-router-dom';

const PricingService = () => {
  const navigate = useHistory();
  return (
    <>
      <Stack>
        <Typography
          variant="h2"
          style={{ marginTop: 10, marginBottom: 16 }}
          color="#0000FF"
          sx={{ display: 'flex', justifyContent: 'center' }}
        >
          Pricing
        </Typography>
        <Stack direction="row" spacing={2} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Box
            sx={{
              backgroundColor: '#E0E0E0',
              color: 'black',
              paddingX: 5,
              paddingY: 3,
              borderRadius: 2,
              alignItems: 'center',
              justifyContent: 'center',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography fontSize={14} fontWeight="600" color="#0000FF" variant="h6">
              Starter
            </Typography>
            <Typography
              variant="h3"
              fontSize={20}
              fontWeight="1000"
              style={{ marginTop: 10, marginBottom: 10 }}
              color="#0000FF"
            >
              Free
            </Typography>
            <Box>
              <Typography fontSize={14} fontWeight="600">
                Access to Daily Update Data. But limited
              </Typography>
              <Typography fontSize={14} fontWeight="600">
                Full Port Coverage
              </Typography>
              <Typography fontSize={14} fontWeight="600">
                Free 5 request When Created Account
              </Typography>
              <Typography fontSize={14} fontWeight="600">
                Access to Special Query
              </Typography>
            </Box>
            <Button
              variant="contained"
              style={{ textTransform: 'none' }}
              sx={{ marginTop: 10 }}
              onClick={() => {
                navigate.replace('');
              }}
            >
              Start Your Search
            </Button>
          </Box>
          <Box
            sx={{
              backgroundColor: '#E0E0E0',
              color: 'black',
              paddingX: 5,
              paddingY: 3,
              borderRadius: 2,
              alignItems: 'center',
              justifyContent: 'center',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography fontSize={14} fontWeight="600" color="#0000FF" variant="h6">
              Gold
            </Typography>
            <Box sx={{ flexDirection: 'row', display: 'flex' }}>
              <Typography
                variant="h3"
                fontSize={20}
                fontWeight="1000"
                style={{ marginTop: 10, marginBottom: 10 }}
                color="#0000FF"
              >
                $9.9/
              </Typography>
              <Typography
                variant="h6"
                fontSize={5}
                fontWeight="1000"
                style={{ marginTop: 20, marginBottom: 10 }}
                color="brown"
              >
                100 Requests
              </Typography>
            </Box>
            <Box>
              <Typography fontSize={14} fontWeight="600">
                Access to Daily Update Data
              </Typography>
              <Typography fontSize={14} fontWeight="600">
                Full Port Coverage
              </Typography>
              <Typography fontSize={14} fontWeight="600">
                Free 100 Requests
              </Typography>
              <Typography fontSize={14} fontWeight="600">
                Access to Special Query
              </Typography>
            </Box>
            <Button variant="contained" style={{ textTransform: 'none' }} sx={{ marginTop: 10 }}>
              Get it now
            </Button>
          </Box>
          <Box
            sx={{
              backgroundColor: '#E0E0E0',
              color: 'black',
              paddingX: 5,
              paddingY: 3,
              borderRadius: 2,
              alignItems: 'center',
              justifyContent: 'center',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography fontSize={14} fontWeight="600" color="#0000FF" variant="h6">
              Diamond
            </Typography>
            <Box sx={{ flexDirection: 'row', display: 'flex' }}>
              <Typography
                variant="h3"
                fontSize={20}
                fontWeight="1000"
                style={{ marginTop: 10, marginBottom: 10 }}
                color="#0000FF"
              >
                $19.9/
              </Typography>
              <Typography
                variant="h6"
                fontSize={5}
                fontWeight="1000"
                style={{ marginTop: 20, marginBottom: 10 }}
                color="brown"
              >
                300 Requests
              </Typography>
            </Box>
            <Box>
              <Typography fontSize={14} fontWeight="600">
                Access to Daily Update Data
              </Typography>
              <Typography fontSize={14} fontWeight="600">
                Full Port Coverage
              </Typography>
              <Typography fontSize={14} fontWeight="600">
                Free 300 Requests
              </Typography>
              <Typography fontSize={14} fontWeight="600">
                Access to Special Query
              </Typography>
            </Box>
            <Button variant="contained" style={{ textTransform: 'none' }} sx={{ marginTop: 10 }}>
              Get it now
            </Button>
          </Box>
        </Stack>
      </Stack>
    </>
  );
};
export default PricingService;
