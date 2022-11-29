import { keyBy, max, min, range } from 'lodash';
import React, { ReactNode } from 'react';

import { interpolateColor } from '../utils/colors';
import { FlashCard } from '../types';
import { Body, Cell, Header, Row, Table } from './statistics-view.styles';

interface Props {
  deck: FlashCard[];
}

const StatisticsView: React.FC<Props> = ({ deck }) => {
  const cardsByTitle = keyBy(deck, 'question.title');
  console.log(cardsByTitle);

  const cell = (a: number, b: number): ReactNode => {
    const key = `${a} x ${b}`;
    const card = cardsByTitle[key];
    let count = 0;
    let ratio = NaN;
    if (card != null) {
      console.log(card);
      const v = card.statistics;
      console.log(v);
      count = v.ok + v.ng;
      const c = max([count, 1]) ?? 1;
      ratio = v.ok / c;
    }
    const opacity = min([1, count / 10]);
    const backgroundColor = isNaN(ratio)
      ? 'gray'
      : ratio > 0.9
      ? 'blue'
      : interpolateColor('00ff00', 'ff0000', ratio);
    const cssStyle = {
      backgroundColor,
      opacity
    };
    return <Cell key={b} style={cssStyle} width="16px" height="16px"></Cell>;
  };

  const row = (a: number): ReactNode => (
    <Row key={a}>
      <Cell key={0}>
        <b>{a}</b>
      </Cell>
      {range(1, 11).map(b => cell(a, b))}
    </Row>
  );

  const heading = (a: number): ReactNode => <th key={a}>{a > 0 ? a : ''}</th>;

  return (
    <Table>
      <Header>
        <Row>{range(0, 11).map(heading)}</Row>
      </Header>
      <Body>{range(1, 11).map(row)}</Body>
    </Table>
  );
};

export default StatisticsView;
