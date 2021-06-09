import React from 'react';
import styled from 'styled-components';
import IconCheckList from './icons/IconChecklist';
import IconCoins from './icons/IconCoins';
import IconDownload from './icons/IconDownload';
import IconGitHub from './icons/IconGitHub';
import IconStats from './icons/IconStats';

const StyledButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  box-sizing: border-box;
  border: none;
  border-radius: ${props => props.theme.website.radiusSmall};
  transition: color 0.1s, background-color 0.1s;
  line-height: 1;
  font-family: 'Lato', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  color: white;
  background-color: ${props => props.theme.website.primaryColor};
  font-size: ${props => props.theme.website.textSizeMobile};
  height: 32px;
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 2.5px;
  @media (min-width: ${props => props.theme.tabletWidth}) {
    font-size: ${props => props.theme.website.textSizeTablet};
    height: 33px;
  }
  @media (min-width: ${props => props.theme.desktopWidth}) {
    font-size: ${props => props.theme.website.textSizeDesktop};
    height: 34px;
    padding-bottom: 3px;
  }
  svg path {
    fill: white;
  }
  &.green {
    background-color: ${props => props.theme.website.secondaryColor};
    &:hover {
      background-color: ${props => props.theme.website.primaryColor};
    }
    &:active {
      background-color: ${props => props.theme.website.activeColor};
    }
  }
  &.orange {
    background-color: ${props => props.theme.website.activeColor};
  }
  &.outline {
    color: ${props => props.theme.website.primaryColor};
    border: 2px solid;
    background-color: transparent;
    padding-left: 9px;
    padding-right: 9px;
    padding-bottom: 3px;
    svg path {
      fill: ${props => props.theme.website.primaryColor};
    }
    &.green {
      color: ${props => props.theme.website.secondaryColor};
      svg path {
        fill: ${props => props.theme.website.secondaryColor};
      }
    }
    &.orange {
      color: ${props => props.theme.website.activeColor};
      svg path {
        fill: ${props => props.theme.website.activeColor};
      }
    }
    &:hover {
      color: white;
      svg path {
        fill: white;
      }
    }
  }
  &:hover {
    background-color: ${props => props.theme.website.secondaryColor};
    cursor: pointer;
  }
  &:active {
    background-color: ${props => props.theme.website.activeColor};
    color: white;
  }
  + button {
    margin-left: 8px;
  }
`;

const Icon = styled.span`
  display: block;
  padding-right: 8px;
  height: 14px;
  line-height: 17px;
  svg {
    height: inherit;
  }
`;

const Text = styled.span`
  font-weight: bold;
`;

const Detail = styled.span`
  font-weight: normal;
  &::before {
    content: ' – ';
  }
`;

type ButtonIcon = 'download' | 'checklist' | 'coins' | 'stats' | 'github';
type ButtonAppearance = 'solid' | 'outline';
type ButtonColor = 'blue' | 'green' | 'orange';

export interface ButtonProps {
  icon?: ButtonIcon;
  appearance?: ButtonAppearance;
  color?: ButtonColor;
  text: string;
  details?: string;
}

const IconSvg = (icon: ButtonIcon) => {
  if (icon === 'checklist') return <IconCheckList />;
  if (icon === 'coins') return <IconCoins />;
  if (icon === 'download') return <IconDownload />;
  if (icon === 'github') return <IconGitHub />;
  if (icon === 'stats') return <IconStats />;
};

const Button = ({ icon, appearance, color, text, details }: ButtonProps) => {
  return (
    <StyledButton
      className={
        (appearance === 'outline' ? 'outline' : '') +
        (color !== undefined ? ' ' + color : '')
      }
    >
      {icon && <Icon>{IconSvg(icon)}</Icon>}
      <Text>
        {text}
        {details && <Detail>{details}</Detail>}
      </Text>
    </StyledButton>
  );
};

export default Button;
