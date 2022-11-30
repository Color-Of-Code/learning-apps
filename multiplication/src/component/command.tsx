import React, { Dispatch, PropsWithChildren } from 'react';

import { Wrapper } from './command.styles';

interface Props {
  onClick: Dispatch<void>;
}

const Command: React.FC<PropsWithChildren<Props>> = ({ onClick, children }) => {
  return <Wrapper onClick={() => onClick()}>{children}</Wrapper>;
};

export default Command;
