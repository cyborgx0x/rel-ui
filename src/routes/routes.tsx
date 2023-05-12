import React, { FC, Fragment } from 'react';

import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import AuthGuard from '@/components/Auth/AuthGuard';
import GuestGuard from '@/components/Auth/GuestGuard';
import { Footer } from '@/components/Footer';
import { Layout } from '@/components/Layout';
import Login from '@/pages/authentication/Login';
import CommandCenter from '@/pages/Dashboard/CommandCenter';
import SearchName from '@/pages/search/SearchName';

const ListRouter = () => {
  return (
    <Router>
      <Switch>
        <Route
          key="erp"
          path="/"
          exact
          render={(props) => (
            <AuthGuard>
              <Layout>
                <CommandCenter />
              </Layout>
            </AuthGuard>
          )}
        />
        <Route
          key="soc"
          path="/soc"
          exact
          render={(props) => (
            <AuthGuard>
              <Layout>
                <CommandCenter />
              </Layout>
            </AuthGuard>
          )}
        />
        <Route
          key="login"
          path="/auth/login"
          exact
          render={(props) => (
            <GuestGuard>
              <Layout>
                {/* <Login /> */}
                <SearchName />
              </Layout>
              {/* <CommandCenter /> */}
            </GuestGuard>
          )}
        />
        <Route
          key="camera"
          path="/camera"
          exact
          render={(props) => (
            <AuthGuard>
              <Layout>
                <CommandCenter />
              </Layout>
            </AuthGuard>
          )}
        />
        <Route
          key="ttdvcn"
          path="/ttdvcn"
          exact
          render={(props) => (
            <AuthGuard>
              <Layout>
                <CommandCenter />
              </Layout>
            </AuthGuard>
          )}
        />
        <Route
          key="map"
          path="/map"
          exact
          render={(props) => (
            <AuthGuard>
              <Layout>
                <CommandCenter />
              </Layout>
            </AuthGuard>
          )}
        />
        <Route
          key="private"
          path="/camera/private"
          exact
          render={(props) => (
            <AuthGuard>
              <Layout>
                <CommandCenter />
              </Layout>
            </AuthGuard>
          )}
        />
      </Switch>
    </Router>
  );
};

export default ListRouter;
