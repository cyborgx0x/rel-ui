import { useState } from 'react';

import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import { Icon } from '@iconify/react';
// material
import { LoadingButton } from '@mui/lab';
import { Link, Stack, Checkbox, TextField, IconButton, InputAdornment, FormControlLabel } from '@mui/material';
import { useFormik, Form, FormikProvider } from 'formik';
import { Link as RouterLink } from 'react-router-dom';
import * as Yup from 'yup';

import useAuth from '@/Hooks/useAuth';

export default function LoginForm() {
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    account: Yup.string().required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      account: '',
      password: '',
      remember: true,
    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      await login(values.account, values.password);
    },
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            autoComplete="username"
            label="Tên tài khoản"
            placeholder="Nhập tên tài khoản"
            InputLabelProps={{ shrink: true }}
            {...getFieldProps('account')}
            error={Boolean(touched.account && errors.account)}
            helperText={touched.account && errors.account}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Mật khẩu"
            placeholder="Nhập mật khẩu"
            InputLabelProps={{ shrink: true }}
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          <FormControlLabel
            control={<Checkbox {...getFieldProps('remember')} checked={values.remember} />}
            label="Remember me"
          />

          <Link component={RouterLink} variant="subtitle2" to="/">
            Forgot password?
          </Link>
        </Stack>

        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
          Login
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}
