import React from 'react';
import styled from 'styled-components';
import Background from './Background';

const PatternBackground = styled(props => <Background {...props} />)`
  opacity: 0.15;
  background-repeat: repeat;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="6" height="6"><rect fill="white" x="0" y="0" width="1" height="1" /><rect fill="white" x="3" y="3" width="1" height="1" /></svg>');
`;

export default PatternBackground;
