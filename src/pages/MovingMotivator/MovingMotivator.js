import React, { useEffect, useState, useContext } from 'react';

import { ChartDataContext } from 'context/ChartDataContext';
import MovingMotivatorRawChart from 'components/MovingMotivatorRawChart/MovingMotivatorRawChart';
import MovingMotivatorAggregationChart from 'components/MovingMotivatorAggregationChart/MovingMotivatorAggregationChart';

import { Container, Row } from './MovingMotivator.styles';

const MovingMotivator = () => {
  const {
    state: {
      movingMotivatorData,
      movingMotivatorMaxData,
      movingMotivatorMinData,
    },
  } = useContext(ChartDataContext);
  const [isLoaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, [movingMotivatorData]);
  return (
    <Container>
      {isLoaded && (
        <>
          <Row>
            <MovingMotivatorRawChart chartData={movingMotivatorData} />
          </Row>
          <Row>
            <MovingMotivatorAggregationChart
              chartData={movingMotivatorData}
              movingMotivatorMaxData={movingMotivatorMaxData}
              movingMotivatorMinData={movingMotivatorMinData}
            />
          </Row>
        </>
      )}
    </Container>
  );
};

export default MovingMotivator;
