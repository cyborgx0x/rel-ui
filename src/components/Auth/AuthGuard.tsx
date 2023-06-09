import React from 'react';

import { Redirect } from 'react-router-dom';

import { useUser } from '@/contexts/User';

interface IProps {
  children: React.ReactElement;
}
const AuthGuard = ({ children }: IProps) => {
  const { isAuthenticated } = useUser();

  // if (!isAuthenticated) {
  //   return <Redirect to="/auth/login" />;
  // }

  return <>{children}</>;
};

export default AuthGuard;
