import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { LocationDescriptor } from 'history';
// eslint-disable-next-line
// @ts-ignore
import Arrow from 'assets/img/arrow.svg';

interface TitleProps {
  to?: LocationDescriptor;
  children: ReactNode;
}
const Title = ({ to, ...props }: TitleProps) => {
  if (to) {
    return <Link to={to} {...props} />;
  }

  return <p {...props} />;
};

export default styled(Title)<TitleProps>`
  text-decoration: none;
  position: relative;
  display: block;
  height: 63px;
  margin: 0;
  padding-right: 10px;
  color: ${props => props.theme.primaryColor};
  font-weight: bold;
  line-height: 1.3;
  overflow: hidden;

  &:hover {
    color: ${props => props.theme.activeColor};
    cursor: pointer;
  }

  &:before {
    content: '';
    position: absolute;
    right: 0;
    bottom: 3px;
    display: block;
    width: 7px;
    height: 12px;
    background: url(${Arrow}) 0 0 no-repeat;
    z-index: 2;
  }

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
