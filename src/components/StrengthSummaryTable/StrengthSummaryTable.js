import React from 'react';

import { getUUID } from 'utils/utils';

import { Container, Row, Item } from './StrengthSummaryTable.styles';

const StrengthSummaryTable = ({ summaryData }) => {
  return (
    <Container>
      {summaryData &&
        summaryData.map((el) => (
          <Row key={getUUID()}>
            {el.map((item) => (
              <Item key={item.title}>
                <Item.Left>{item.title}</Item.Left>
                <Item.Right>{item.name}</Item.Right>
              </Item>
            ))}
          </Row>
        ))}
    </Container>
  );
};

export default StrengthSummaryTable;
