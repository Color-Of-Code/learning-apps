import React, {Dispatch} from 'react';

import { Wrapper } from './banner-start.styles';

interface Props {
  onClick: Dispatch<any>
}

const BannerEnd: React.FC<Props> = ({ onClick }) => {
  return (
    <Wrapper onClick={onClick}>
        NEXT
    </Wrapper>
  );
};

export default BannerEnd;
