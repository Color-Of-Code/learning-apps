
import React from 'react';

import { Wrapper } from './score.styles';

interface Props {
  value: number
  maximum: number
  remaining: number
}

const Score: React.FC<Props> = ({ value, maximum, remaining }) => {
  return (
    <Wrapper>
      Score: {value} / {maximum} ({remaining})
    </Wrapper>
  );
};

export default Score;
