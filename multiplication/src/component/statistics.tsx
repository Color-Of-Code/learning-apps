import { max, range } from 'lodash';
import React from 'react';

import { Statistics } from '../types';

interface Props {
  statistics: Statistics
}

const StatisticsView: React.FC<Props> = ({
  statistics
}) => {

  const cell = (a: number, b: number) => {
    const key = `${a} x ${b}`;
    const v = statistics[key];
    const c = v?.ok + v?.ng;
    const ratio = (v?.ok || 0) / (c || 1);

    const opacity = v == null ? undefined : `${0.5 + (v.ok / c) / 2}`;
    const cssStyle = {
      backgroundColor: v == null ? 'gray' : (ratio < 0.5) ? 'red' : (ratio < 0.7) ? 'orange' : 'blue',
      opacity,
      
    }
    return (<td style={cssStyle}
      width='16px' height='16px'
      ></td>);
  };

  const row = (a: number) => {
    return (<tr>
      {range(1, 11).map(b => cell(a, b))}
    </tr>
    );
  };

  return (
    <table>
      {range(1, 11).map(row)}
    </table>
  )
};

export default StatisticsView;
