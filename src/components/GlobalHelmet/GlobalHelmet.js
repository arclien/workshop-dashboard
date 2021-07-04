import React from 'react';
import { Helmet } from 'react-helmet';

import useMobileDetect from 'hooks/useMobileDetect';

const GlobalHelmet = () => {
  const isMobile = useMobileDetect();
  return (
    <>
      {!isMobile && (
        <Helmet>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, maximum-scale=1"
          />
        </Helmet>
      )}
      {isMobile && (
        <Helmet>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, maximum-scale=1"
          />
        </Helmet>
      )}
    </>
  );
};

export default GlobalHelmet;
