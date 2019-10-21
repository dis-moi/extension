import React from 'react';
import styled from 'styled-components';
import Truncated from '../../atoms/Truncated';

export const TitleContainer = styled.p`
  position: relative;
  display: block;
  height: 63px;
  margin: 0 10px 0 0;
  color: ${props => props.theme.primaryColor};
  font-weight: bold;
  line-height: 1.3;
  overflow: hidden;

  &:after {
    content: '';
    text-align: right;
    position: absolute;
    bottom: 3px;
    right: 0;
    width: 50%;
    height: 20px;
    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 1) 50%
    );
  }
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
