import React, { useEffect, useState, useCallback } from 'react';
import ReactEcharts from 'echarts-for-react';

import { chartStyle } from 'constants/chart';

const defaultOption = {
  color: ['#FFD300', '#ff8e8e'],
  legend: {
    data: ['욕구강점', '행동판단강점'],
  },
};

const StrengthRawChart = ({
  chartData,
  onEvents,
  style = { ...chartStyle },
}) => {
  const [isLoaded, setLoaded] = useState(false);
  const [option, setOption] = useState({ ...defaultOption });
  const [EchartsReact, setEchartsReact] = useState(null);

  const getRadarOption = (index) => {
    return {
      shape: 'circle',
      indicator: [
        { name: '외교', max: 50 },
        { name: '동기부여', max: 50 },
        { name: '창조', max: 50 },
        { name: '탐구', max: 50 },
        { name: '평가', max: 50 },
        { name: '조정', max: 50 },
        { name: '완성', max: 50 },
        { name: '추진', max: 50 },
      ],
      name: {
        textStyle: {
          color: '#fff',
          backgroundColor: '#666',
          borderRadius: 3,
          padding: [3, 5],
        },
      },
      splitArea: {
        show: false,
      },
      startAngle: 115,
      radius: 120,
      center: [
        `${(index % 5) * 20 + 10}%`,
        `${Math.floor(index / 5) * 30 + 20}%`,
      ],
    };
  };

  const getSeriesOption = useCallback(
    (key, index) => {
      return {
        name: key,
        type: 'radar',
        symbol: 'none',
        radarIndex: index,
        data: [
          {
            value: chartData[key].first,
            name: '욕구강점',
            lineStyle: {
              width: 4,
            },
          },
          {
            value: chartData[key].second,
            name: '행동판단강점',
            lineStyle: {
              type: 'dashed',
            },
          },
        ],
      };
    },
    [chartData]
  );

  useEffect(() => {
    const _option = {
      ...defaultOption,
      title: (function () {
        return Object.keys(chartData).map((key, index) => {
          return {
            subtext: key,
            left: `${(index % 5) * 20 + 10}%`,
            top: `${Math.floor(index / 5) * 30 + 32}%`,
            textAlign: 'center',
          };
        });
      })(),
      radar: (function () {
        return Object.keys(chartData).map((key, index) =>
          getRadarOption(index)
        );
      })(),

      series: (function () {
        return Object.keys(chartData).map((key, index) =>
          getSeriesOption(key, index)
        );
      })(),
    };
    setOption(_option);

    const instance = EchartsReact?.getEchartsInstance();
    if (instance) {
      instance.clear();
      instance.setOption(_option);
    }

    setLoaded(true);
  }, [EchartsReact, chartData, getSeriesOption]);

  return (
    <>
      {isLoaded && (
        <ReactEcharts
          ref={(e) => {
            setEchartsReact(e);
          }}
          style={style}
          option={option}
          onEvents={onEvents}
        />
      )}
    </>
  );
};

export default StrengthRawChart;
