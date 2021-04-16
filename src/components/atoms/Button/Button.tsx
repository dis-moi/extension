import React, { HTMLAttributes, ReactNode } from 'react';
import styled from 'styled-components';
import { Theme } from 'app/theme';

import LoadingRotator from 'components/atoms/LoadingRotator/LoadingRotator';
import Loading from 'components/atoms/icons/Loading';

export interface ButtonContainerProps
  extends HTMLAttributes<HTMLButtonElement> {
  theme?: Theme;
  href?: string;
  to?: string;
  target?: '_blank';
  rel?: string;
  className?: string;
  disabled?: boolean;
  type?: 'submit' | 'reset' | 'button';
}

export interface ButtonProps extends ButtonContainerProps {
  loading?: boolean;
  children?: ReactNode | string;
  disabled?: boolean;
  dangerouslySetInnerHTML?: { __html: string };
  size?: 'big' | 'normal';
  transparent?: boolean;
}

export const ButtonContainer = styled.button<ButtonContainerProps>``;

const Button = ({
  loading,
  children,
  target,
  rel,
  href,
  className,
  ...props
}: ButtonProps) => (
  <ButtonContainer
    className={className}
    href={href}
    target={target}
    rel={rel}
    {...props}
  >
    {loading ? (
      <LoadingRotator>
        <Loading />
      </LoadingRotator>
    ) : (
      children
    )}
  </ButtonContainer>
);

export default styled(Button)`
  box-sizing: border-box;
  display: inline-block;
  min-width: 130px;
  padding: ${props => (props.size === 'big' ? '8px 19px' : '6px 12px')};
  font-weight: bold;
  font-size: ${props => props.theme.fontSizeDefault};
  color: #fff;
  line-height: 1;
  background-color: ${props =>
    props.transparent === true ? 'transparent' : props.theme.Button.default};
  border: 2px solid ${props => props.theme.Button.default};
  border-radius: ${props => props.theme.radiusS};
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover,
  &:focus,
  &:active {
    color: #fff;
  }

  &:hover {
    background-color: ${props => props.theme.Button.hover};
    border-color: ${props => props.theme.Button.hover};

    svg {
      fill: #fff;
    }
  }

  :disabled:hover {
    color: #fff;
  }

  svg {
    fill: #fff;
  }

  &:focus {
    outline: 1px dotted ${props => props.theme.Button.hover};
  }

  &:active {
    outline: 1px dotted ${props => props.theme.Button.hover};
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
    background-color: ${props => props.theme.Button.disabled};
    border-color: ${props => props.theme.Button.disabled};
  }
`;
