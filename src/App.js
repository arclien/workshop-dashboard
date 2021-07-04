import React from 'react';
import { BrowserRouter, Redirect, Switch } from 'react-router-dom';
import { GlobalTheme } from 'remember-ui';

import MovingMotivator from 'pages/MovingMotivator/MovingMotivator';
import { ChartDataProvider } from 'context/ChartDataContext';
import { ConfirmModalProvider } from 'context/ConfirmModalContext';
import GlobalConfirmModal from 'components/GlobalConfirmModal/GlobalConfirmModal';
import GlobalHelmet from 'components/GlobalHelmet/GlobalHelmet';
import Routes from 'routers/routes';
import CommonRoute from 'routers/CommonRoute';
import Strength from 'pages/Strength/Strength';

import { AppBody } from './App.styles';

const BASE_URL = '/workshop-dashboard';

function App() {
  const { root, movingMotivator } = Routes;

  return (
    <ChartDataProvider>
      <ConfirmModalProvider>
        <GlobalHelmet />
        <BrowserRouter basename={BASE_URL}>
          <AppBody>
            <GlobalTheme />
            <Switch>
              <CommonRoute path={movingMotivator.path}>
                <MovingMotivator />
              </CommonRoute>
              <CommonRoute path={root.path}>
                <Strength />
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
