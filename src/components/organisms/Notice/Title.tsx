import React from 'react';
import styled from 'styled-components';
import Truncated from '../../atoms/Truncated';

export const TitleContainer = styled.p`
  display: inline;
  margin: 0 10px 0 0;
  color: ${props => props.theme.primaryColor};
  font-weight: bold;
  line-height: 1.3;
`;

interface Props {
  children: string;
  numberOfCharacters?: number;
}
const NoticeTitle = ({ children, numberOfCharacters }: Props) => (
  <TitleContainer>
    <Truncated
      numberOfCharacters={
        numberOfCharacters || NoticeTitle.defaultProps.numberOfCharacters
      }
    >
      {children}
    </Truncated>
  </TitleContainer>
);

NoticeTitle.defaultProps = {
  numberOfCharacters: 92
};

export default NoticeTitle;
