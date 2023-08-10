import React, { FC, Fragment } from 'react';

import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import AuthGuard from '@/components/Auth/AuthGuard';
import GuestGuard from '@/components/Auth/GuestGuard';
import { Footer } from '@/components/Footer';
import { Layout } from '@/components/Layout';
import PricingService from '@/pages/Pricing/PricingService';
import SearchDetail from '@/pages/search/SearchDetail';
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
            <GuestGuard>
              <Layout>
                <SearchDetail />
              </Layout>
            </GuestGuard>
          )}
        />
        <Route
          key="full_search"
          path="/full_search"
          exact
          render={(props) => (
            <GuestGuard>
              <Layout>
                <SearchDetail />
              </Layout>
            </GuestGuard>
          )}
        />
        <Route
          key="pricing"
          path="/pricing"
          exact
          render={(props) => (
            <AuthGuard>
              <Layout>
                <PricingService />
              </Layout>
            </AuthGuard>
          )}
        />
      </Switch>
    </Router>
  );
};

export default ListRouter;
