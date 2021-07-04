/* eslint-disable func-names */
import React, { useEffect, useState } from 'react';
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts';

import { chartStyle } from 'constants/chart';

const defaultOption = {
  title: [
    {
      text: '무빙모티베이터',
    },
    {
      subtext: 'ideal',
      left: '20%',
      top: '75%',
      textAlign: 'center',
    },
    {
      subtext: 'reality',
      left: '75%',
      top: '75%',
      textAlign: 'center',
    },
  ],
  radar: [
    {
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
      startAngle: 90,
      radius: 250,
      center: ['20%', '45%'],
    },
    {
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
      startAngle: 90,
      radius: 250,
      center: ['75%', '45%'],
    },
  ],
};

const MovingMotivatorAggregationChart = ({
  chartData,
  movingMotivatorMaxData,
  movingMotivatorMinData,
  onEvents,
  style = { ...chartStyle },
}) => {
  const [isLoaded, setLoaded] = useState(false);
  const [option, setOption] = useState({ ...defaultOption });
  const [EchartsReact, setEchartsReact] = useState(null);

  useEffect(() => {
    const _option = {
      ...defaultOption,
      legend: {
        data: (function () {
          return [
            ...Object.keys(chartData).map((key) => {
              return key;
            }),
            'max',
            'min',
          ];
        })(),
      },
      series: [
        {
          type: 'radar',
          symbol: 'none',
          emphasis: {
            lineStyle: {
              width: 6,
            },
          },
          data: (function () {
            return [
              ...Object.keys(chartData).map((key) => {
                const obj = {
                  value: chartData[key].first,
                  name: key,
                };
                return key === 'aggregation'
                  ? {
                      ...obj,
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
                    }
                  : obj;
              }),
              {
                value: movingMotivatorMaxData.first,
                name: 'max',
                areaStyle: {
                  color: new echarts.graphic.RadialGradient(0, 1, 1, [
                    {
                      color: 'rgba(123, 188, 211, 1)',
                      offset: 0,
                    },
                    {
                      color: 'rgba(123, 188, 211, 1)',
                      offset: 1,
                    },
                  ]),
                },
              },
              {
                value: movingMotivatorMinData.first,
                name: 'min',
                areaStyle: {
                  color: new echarts.graphic.RadialGradient(0, 1, 1, [
                    {
                      color: 'rgba(123, 200, 124, 1)',
                      offset: 0,
                    },
                    {
                      color: 'rgba(123, 200, 124, 1)',
                      offset: 1,
                    },
                  ]),
                },
              },
            ];
          })(),
        },
        {
          type: 'radar',
          radarIndex: 1,
          symbol: 'none',
          emphasis: {
            lineStyle: {
              width: 4,
            },
          },
          data: (function () {
            return [
              ...Object.keys(chartData).map((key) => {
                const obj = {
                  value: chartData[key].second,
                  name: key,
                };
                return key === 'aggregation'
                  ? {
                      ...obj,
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
                    }
                  : obj;
              }),
              {
                value: movingMotivatorMaxData.second,
                name: 'max',
                areaStyle: {
                  color: new echarts.graphic.RadialGradient(0, 1, 1, [
                    {
                      color: 'rgba(123, 188, 211, 1)',
                      offset: 0,
                    },
                    {
                      color: 'rgba(123, 188, 211, 1)',
                      offset: 1,
                    },
                  ]),
                },
              },
              {
                value: movingMotivatorMinData.second,
                name: 'min',
                areaStyle: {
                  color: new echarts.graphic.RadialGradient(0, 1, 1, [
                    {
                      color: 'rgba(123, 200, 124, 1)',
                      offset: 0,
                    },
                    {
                      color: 'rgba(123, 200, 124, 1)',
                      offset: 1,
                    },
                  ]),
                },
              },
            ];
          })(),
        },
      ],
    };
    setOption(_option);

    const instance = EchartsReact?.getEchartsInstance();
    if (instance) {
      instance.clear();
      instance.setOption(_option);
    }

    setLoaded(true);
  }, [EchartsReact, chartData, movingMotivatorMaxData, movingMotivatorMinData]);

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

export default MovingMotivatorAggregationChart;
