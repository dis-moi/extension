/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import styled from 'styled-components';
import Truncated from '../atoms/Truncated';

export const Title = styled.p`
    display: inline-block;
    margin: 0;
    color: ${props => props.theme.mainText};
    font-weight: bold;
`;

export default ({ children }) => (
  <Title>
    « <Truncated width="290px">{children}</Truncated> »
  </Title>
);