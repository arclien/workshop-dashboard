import React from 'react';
import { BrowserRouter, Redirect, Switch } from 'react-router-dom';
import { GlobalTheme } from 'remember-ui';

import { ChartDataProvider } from 'context/ChartDataContext';
import { ConfirmModalProvider } from 'context/ConfirmModalContext';
import GlobalConfirmModal from 'components/GlobalConfirmModal/GlobalConfirmModal';
import GlobalHelmet from 'components/GlobalHelmet/GlobalHelmet';
import Routes from 'routers/routes';
import CommonRoute from 'routers/CommonRoute';
import Dashboard from 'pages/Dashboard/Dashboard';

import { AppBody } from './App.styles';

const BASE_URL = '/workshop-dashboard';

function App() {
  const { root } = Routes;

  return (
    <ChartDataProvider>
      <ConfirmModalProvider>
        <GlobalHelmet />
        <BrowserRouter basename={BASE_URL}>
          <AppBody>
            <GlobalTheme />
            <Switch>
              <CommonRoute path={root.path}>
                <Dashboard />
              </CommonRoute>
              <Redirect to={root.path} />
            </Switch>
          </AppBody>
          <GlobalConfirmModal />
        </BrowserRouter>
      </ConfirmModalProvider>
    </ChartDataProvider>
  );
}

export default App;
