import React, { useEffect, useState, useContext } from 'react';

import StrengthRawChart from 'components/StrengthRawChart/StrengthRawChart';
import StrengthAggregationChart from 'components/StrengthAggregationChart/StrengthAggregationChart';
import StrengthSummaryTable from 'components/StrengthSummaryTable/StrengthSummaryTable';
import { ChartDataContext } from 'context/ChartDataContext';

import { Container, Row } from './Strength.styles';

const Strength = () => {
  const {
    state: {
      strengthData,
      strengthMinData,
      strengthMaxData,
      strengthSummaryData,
    },
  } = useContext(ChartDataContext);
  const [isLoaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, [strengthData]);

  return (
    <Container>
      {isLoaded && (
        <>
          <Row>
            <StrengthRawChart chartData={strengthData} />
          </Row>
          <Row>
            <StrengthAggregationChart
              chartData={strengthData}
              strengthMinData={strengthMinData}
              strengthMaxData={strengthMaxData}
            />
          </Row>
          <Row>
            <StrengthSummaryTable summaryData={strengthSummaryData} />
          </Row>
        </>
      )}
    </Container>
  );
};

export default Strength;
