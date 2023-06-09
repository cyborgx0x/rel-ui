import { Box, Button, Stack, Typography } from '@mui/material';

const PricingService = () => {
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
                Access to Daily Update Data
              </Typography>
              <Typography fontSize={14} fontWeight="600">
                Full Port Coverage
              </Typography>
              <Typography fontSize={14} fontWeight="600">
                Up to 10,000 API Results per 30 Days
              </Typography>
              <Typography fontSize={14} fontWeight="600">
                Access to Special Query
              </Typography>
            </Box>
            <Button variant="contained" style={{ textTransform: 'none' }} sx={{ marginTop: 10 }}>
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
                Access to Daily Update Data
              </Typography>
              <Typography fontSize={14} fontWeight="600">
                Full Port Coverage
              </Typography>
              <Typography fontSize={14} fontWeight="600">
                Up to 10,000 API Results per 30 Days
              </Typography>
              <Typography fontSize={14} fontWeight="600">
                Access to Special Query
              </Typography>
            </Box>
            <Button variant="contained" style={{ textTransform: 'none' }} sx={{ marginTop: 10 }}>
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
                Access to Daily Update Data
              </Typography>
              <Typography fontSize={14} fontWeight="600">
                Full Port Coverage
              </Typography>
              <Typography fontSize={14} fontWeight="600">
                Up to 10,000 API Results per 30 Days
              </Typography>
              <Typography fontSize={14} fontWeight="600">
                Access to Special Query
              </Typography>
            </Box>
            <Button variant="contained" style={{ textTransform: 'none' }} sx={{ marginTop: 10 }}>
              Start Your Search
            </Button>
          </Box>
        </Stack>
      </Stack>
    </>
  );
};
export default PricingService;
