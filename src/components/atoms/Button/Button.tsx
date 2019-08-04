import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { Theme } from 'app/theme';

import LoadingRotator from 'components/atoms/LoadingRotator/LoadingRotator';
import Loading from 'components/atoms/icons/Loading';

export interface ButtonContainerProps {
  theme?: Theme;
  href?: string;
  to?: string;
  target?: '_blank';
  rel?: string;
  onClick?: (...args: any[]) => any;
  disabled?: boolean;
  type?: 'submit' | 'reset' | 'button';
}

export interface ButtonProps extends ButtonContainerProps {
  loading?: boolean;
  children?: ReactNode | string;
  dangerouslySetInnerHTML?: any;
}

export const ButtonContainer = styled.button<ButtonContainerProps>`
  box-sizing: border-box;
  padding: 0;
  font-weight: bold;
  line-height: 1;
  color: ${props => props.theme.secondaryColor};
  text-transform: uppercase;
  text-decoration: underline;
  background: none;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    color: ${props => props.theme.activeColor};
  }

  &:active {
    outline: 1px dotted ${props => props.theme.activeColor};
  }

  &:disabled {
    color: #fff;
    cursor: auto;

    svg,
    &:hover svg {
      fill: #fff;
    }
  }

  &:disabled,
  &:disabled:hover,
  &:disabled:active,
  &:disabled:visited {
    background-color: ${props => props.theme.basicButton.disabled};
    border-color: ${props => props.theme.basicButton.disabled};
  }

  ${LoadingRotator} svg {
    width: 18px;
    height: 18px;
  }
`;

export default ({ loading, children, ...props }: ButtonProps) => (
  <ButtonContainer {...props}>
    {loading ? (
      <LoadingRotator>
        <Loading />
      </LoadingRotator>
    ) : (
      children
    )}
  </ButtonContainer>
);
