/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import styled from 'styled-components';
import Truncated from '../atoms/Truncated';

export const Title = styled.p`
    display: inline;
    margin: 0 10px 0 0;
    color: ${props => props.theme.activeColor};
    font-weight: bold;
    line-height: 1.3;
    font-family: 'Lato', sans-serif;
`;

export default ({ children }) => (
  <Title>
    <Truncated numberOfWords={9}>{children}</Truncated>
  </Title>
);