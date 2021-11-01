import React from 'react';
import styled from 'styled-components';
import Background from './Background';

const GradientBackground = styled(props => <Background {...props} />)`
  background: rgb(23, 35, 68);
  background: linear-gradient(
    60deg,
    rgba(23, 35, 68, 1) 0%,
    rgba(40, 58, 124, 1) 100%
  );
`;

export default GradientBackground;
