/* eslint-disable func-names */
import React, { useEffect, useState, useCallback } from 'react';
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts';

import { chartStyle } from 'constants/chart';

const defaultOption = {
  color: ['#FFD300', '#ff8e8e'],
  legend: {
    data: ['이상적인 동기부여(ideal)', '현재의 동기부여(reality)'],
  },
};

const MovingMotivatorRawChart = ({
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
        { name: '호기심', max: 10 },
        { name: '명예', max: 10 },
        { name: '인정', max: 10 },
        { name: '숙련', max: 10 },
        { name: '권한', max: 10 },
        { name: '자유', max: 10 },
        { name: '동료들', max: 10 },
        { name: '규칙', max: 10 },
        { name: '목표', max: 10 },
        { name: '지위', max: 10 },
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
        `${Math.floor(index / 5) * 30 + 15}%`,
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
            name: '이상적인 동기부여(ideal)',
            lineStyle: {
              width: 4,
            },
            areaStyle: {
              color: new echarts.graphic.RadialGradient(0, 1, 1, [
                {
                  color: 'rgba(255, 211, 0, 1)',
                  offset: 0,
                },
                {
                  color: 'rgba(255, 211, 0, 1)',
                  offset: 1,
                },
              ]),
            },
          },
          {
            value: chartData[key].second,
            name: '현재의 동기부여(reality)',
            lineStyle: {
              type: 'dashed',
            },
            areaStyle: {
              color: new echarts.graphic.RadialGradient(0, 1, 1, [
                {
                  color: 'rgba(255, 145, 124, 1)',
                  offset: 0,
                },
                {
                  color: 'rgba(255, 145, 124, 1)',
                  offset: 1,
                },
              ]),
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
            top: `${Math.floor(index / 5) * 30 + 27}%`,
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

export default MovingMotivatorRawChart;
