import React from 'react';
import styled from 'styled-components';
import Background from './Background';

const GradientBackground = styled(props => <Background {...props} />)`
  background: rgb(12, 82, 180);
  background: linear-gradient(
    60deg,
    rgba(12, 82, 180, 1) 0%,
    rgba(23, 186, 174, 1) 100%
  );
`;

export default GradientBackground;
