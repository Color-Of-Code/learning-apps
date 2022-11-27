import React, { Dispatch } from 'react';

import { Wrapper } from './banner-start.styles';

interface Props {
  onClick: Dispatch<any>
}

const BannerStart: React.FC<Props> = ({ onClick }) => {
  return (
    <Wrapper onClick={onClick}>
        START
    </Wrapper>
  );
};

export default BannerStart;
