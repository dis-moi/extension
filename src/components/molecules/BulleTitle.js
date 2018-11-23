/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import styled from 'styled-components';
import Truncated from '../atoms/Truncated';

export const Title = styled.p`
    display:inline-block;
    color: ${props => props.theme.otherText};
`;

export default ({ children }) => (
  <Title>
    « <Truncated width="350px">{children}</Truncated> »
  </Title>
);