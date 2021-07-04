import React, { useState, createContext, useEffect } from 'react';

import { STRENGTH_DATA } from '../constants/chartData';
import { sumArray, maxArray, minArray } from '../utils/utils';

const Context = createContext();

const { Provider, Consumer: ChartDataConsumer } = Context;

const ChartDataProvider = ({ children }) => {
  const [strengthData, setStrengthData] = useState([]);
  const [strengthMinData, setStrengthMinData] = useState([]);
  const [strengthMaxData, setStrengthMaxData] = useState([]);

  useEffect(() => {
    const data = { ...STRENGTH_DATA };

    const maxData = {
      first: maxArray(Object.keys(data).map((key) => data[key].first)),
      second: maxArray(Object.keys(data).map((key) => data[key].second)),
    };

    const minData = {
      first: minArray(Object.keys(data).map((key) => data[key].first)),
      second: minArray(Object.keys(data).map((key) => data[key].second)),
    };

    setStrengthMinData(minData);
    setStrengthMaxData(maxData);

    const existCount = Object.keys(data)
      .map((key) => data[key].first)
      .filter((el) => el.length > 0).length;

    data.aggregation = {
      first: sumArray(Object.keys(data).map((key) => data[key].first)).map(
        (el) => Math.floor(el / existCount)
      ),
      second: sumArray(Object.keys(data).map((key) => data[key].second)).map(
        (el) => Math.floor(el / existCount)
      ),
    };

    setStrengthData(data);
  }, []);

  return (
    <Provider
      value={{
        state: {
          strengthData,
          strengthMinData,
          strengthMaxData,
        },
        actions: {},
      }}
    >
      {children}
    </Provider>
  );
};

const ChartDataContext = Context;

export { ChartDataProvider, ChartDataConsumer, ChartDataContext };
