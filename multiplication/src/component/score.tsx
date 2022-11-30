import React from 'react';

import { Wrapper } from './score.styles';

interface Props {
  value: number;
}

const Score: React.FC<Props> = ({ value }) => <Wrapper>Score: {value}</Wrapper>;

export default Score;
