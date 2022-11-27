import { min, range } from 'lodash';
import React, { ReactNode } from 'react';

import { interpolateColor } from '../utils';
import { Statistics } from '../types';

interface Props {
  statistics: Statistics
}

const StatisticsView: React.FC<Props> = ({ statistics }) => {
  const cell = (a: number, b: number): ReactNode => {
    const key = `${a} x ${b}`;
    const v = statistics[key] ?? { ok: 0, ng: 0, errors: [] };
    const count = v.ok + v.ng;
    const c = min([count, 1]) ?? 1;
    const ratio = v.ok / c;

    const opacity = min([1, count / 10]);
    const backgroundColor =
      isNaN(ratio)
        ? 'gray'
        : (!isNaN(ratio) && ratio > 0.9)
        ? 'blue'
        : interpolateColor('00ff00', 'ff0000', ratio);

    const cssStyle = {
      backgroundColor,
      opacity
    };
    return <td style={cssStyle} width="16px" height="16px"></td>;
  };

  const row = (a: number): ReactNode => {
    return <tr>{range(1, 11).map(b => cell(a, b))}</tr>;
  };

  return <table><thead></thead>{range(1, 11).map(row)}</table>;
};

export default StatisticsView;
