import { Box, Card, Stack, Link, Container, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';

import Logo from '@/assets/image/ic_logo.png';
import Illustration from '@/assets/image/illustration_login.png';
import MHidden from '@/components/common/MHidden';

const RootStyle = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2),
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0),
}));

const ContentLogo = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

// ----------------------------------------------------------------------

const Login = () => {
  return (
    <RootStyle>
      <MHidden width="mdDown">
        <SectionStyle>
          <ContentLogo>
            <RouterLink to="/">
              <img src={Logo} alt="login" />
            </RouterLink>
          </ContentLogo>
          <Typography variant="h4" sx={{ mb: 6 }}>
            Hi, Welcome Back
          </Typography>
          <img src={Illustration} alt="login" />
        </SectionStyle>
      </MHidden>
      <Container maxWidth="sm">
        <ContentStyle>
          <Stack direction="row" alignItems="center" sx={{ mb: 5 }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h4" gutterBottom>
                Thông tin tài khoản
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>Đăng nhập để tiếp tục</Typography>
            </Box>
          </Stack>

          <MHidden width="smUp">
            <Typography variant="body2" align="center" sx={{ mt: 3 }}>
              Don’t have an account?&nbsp;
              <Link variant="subtitle2" component={RouterLink} to="/">
                Get started
              </Link>
            </Typography>
          </MHidden>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
};

export default Login;
