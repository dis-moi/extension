import React from 'react';
import styled from 'styled-components';
import Background from './Background';

const GradientBackground = styled(props => <Background {...props} />)`
  background: ${props => props.theme.website.coverSectionBackgroundColor};
  background: ${props => props.theme.website.coverSectionBackgroundColorBis};
`;

export default GradientBackground;
