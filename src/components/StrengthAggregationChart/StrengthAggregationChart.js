/* eslint-disable func-names */
import React, { useEffect, useState } from 'react';
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts';

import { chartStyle } from 'constants/chart';

const defaultOption = {
  title: [
    {
      text: '강점검사',
    },
    {
      subtext: '욕구 강점',
      left: '20%',
      top: '40%',
      textAlign: 'center',
    },
    {
      subtext: '행동 판단 강점',
      left: '75%',
      top: '40%',
      textAlign: 'center',
    },
    {
      subtext: '강점 정리',
      left: '75%',
      top: '85%',
      textAlign: 'center',
    },
  ],
  radar: [
    {
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
      radius: 150,
      center: ['20%', '25%'],
    },
    {
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
      radius: 150,
      center: ['75%', '25%'],
    },
    {
      shape: 'circle',
      indicator: [
        { name: '외교', max: 9 },
        { name: '동기부여', max: 9 },
        { name: '창조', max: 9 },
        { name: '탐구', max: 9 },
        { name: '평가', max: 9 },
        { name: '조정', max: 9 },
        { name: '완성', max: 9 },
        { name: '추진', max: 9 },
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
      radius: 150,
      center: ['75%', '70%'],
    },
  ],
};

const StrengthAggregationChart = ({
  chartData,
  strengthMaxData,
  strengthMinData,
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
                value: strengthMaxData.first,
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
                value: strengthMinData.first,
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
                value: strengthMaxData.second,
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
                value: strengthMinData.second,
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
          radarIndex: 2,
          symbol: 'none',
          emphasis: {
            lineStyle: {
              width: 4,
            },
          },
          data: [
            {
              value: [0, 2, 4, 1, 5, 2, 9, 3],
            },
          ],
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
  }, [
    EchartsReact,
    chartData,
    strengthMaxData.first,
    strengthMaxData.second,
    strengthMinData.first,
    strengthMinData.second,
  ]);

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

export default StrengthAggregationChart;
