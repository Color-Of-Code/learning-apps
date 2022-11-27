import React, { Dispatch } from 'react';

import { Wrapper } from './command.styles';

interface Props {
  children: any
  onClick: Dispatch<void>
}

const Command: React.FC<Props> = ({ onClick, children }) => {
  return (
    <Wrapper onClick={() => onClick()}>
      {children}
    </Wrapper>
  );
};

export default Command;
