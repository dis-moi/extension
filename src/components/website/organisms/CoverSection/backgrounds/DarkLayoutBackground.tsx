import React from 'react';
import styled from 'styled-components';
import Background from './Background';

const DarkLayoutBackground = styled(props => <Background {...props} />)`
  background: rgba(0, 0, 0, 0.2);
  background: linear-gradient(
    -60deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.35) 100%
  );
`;

export default DarkLayoutBackground;
