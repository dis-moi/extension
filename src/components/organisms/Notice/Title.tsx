import React from 'react';
import styled from 'styled-components';
import Truncated from '../../atoms/Truncated';

export const TitleContainer = styled.p`
  display: inline;
  margin: 0 10px 0 0;
  color: ${props => props.theme.activeColor};
  font-weight: bold;
  line-height: 1.3;
`;

interface Props {
  children: string;
}
const NoticeTitle = ({ children }: Props) => (
  <TitleContainer>
    <Truncated numberOfCharacters={60}>{children}</Truncated>
  </TitleContainer>
);

export default NoticeTitle;
