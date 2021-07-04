import styled from 'styled-components';
import { flexContainer, gray100 } from 'remember-ui';

export const Container = styled.div`
  ${flexContainer('space-between')};

  margin: 0px 10px 100px;
`;

export const Row = styled.div`
  ${flexContainer('center', 'center', 'column')};

  width: 40%;
  margin-bottom: 10px;
`;

export const Item = styled.div`
  ${flexContainer('space-between')};

  width: 100%;
  padding: 10px;
  border: 1px solid ${gray100};
`;

Item.Left = styled.div``;
Item.Right = styled.div``;
