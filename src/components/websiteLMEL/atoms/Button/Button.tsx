import React from 'react';
import styled from 'styled-components';
import IconCheckList from './icons/IconChecklist';
import IconCoins from './icons/IconCoins';
import IconDownload from './icons/IconDownload';
import IconGitHub from './icons/IconGitHub';
import IconList from './icons/IconList';
import IconStats from './icons/IconStats';

const StyledButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  white-space: nowrap;
  border: none;
  border-radius: ${props => props.theme.websiteLMEL.radiusSmall};
  transition: color 0.1s, background-color 0.1s;
  line-height: 1;
  font-family: ${props => props.theme.websiteLMEL.fontFamily};
  color: white;
  background-color: ${props => props.theme.websiteLMEL.primaryColor};
  font-size: ${props => props.theme.websiteLMEL.textSizeMobile};
  height: 32px;
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 2.5px;
  @media (min-width: ${props => props.theme.tabletWidth}) {
    font-size: ${props => props.theme.websiteLMEL.textSizeTablet};
    height: 33px;
  }
  @media (min-width: ${props => props.theme.desktopWidth}) {
    font-size: ${props => props.theme.websiteLMEL.textSizeDesktop};
    height: 34px;
    padding-bottom: 3px;
  }
  svg path {
    fill: white;
  }
  &.green {
    background-color: ${props => props.theme.websiteLMEL.secondaryColor};
    &:hover {
      background-color: ${props => props.theme.websiteLMEL.primaryColor};
    }
    &:active {
      background-color: ${props => props.theme.websiteLMEL.activeColor};
    }
  }
  &.greenDarker {
    background-color: ${props => props.theme.websiteLMEL.secondaryColorDarker};
    &:hover {
      background-color: ${props => props.theme.websiteLMEL.primaryColor};
    }
    &:active {
      background-color: ${props => props.theme.websiteLMEL.activeColor};
    }
  }
  &.orange {
    background-color: ${props => props.theme.websiteLMEL.activeColor};
  }
  &.outline {
    color: ${props => props.theme.websiteLMEL.primaryColor};
    border: 1.5px solid;
    background-color: transparent;
    padding-left: 9px;
    padding-right: 9px;
    padding-bottom: 3px;
    svg path {
      fill: ${props => props.theme.websiteLMEL.primaryColor};
    }
    &.blue {
      color: ${props => props.theme.websiteLMEL.primaryColor};
      border-color: ${props => props.theme.websiteLMEL.primaryColor};
      svg path {
        fill: ${props => props.theme.websiteLMEL.primaryColor};
      }
      &:hover {
        background-color: ${props => props.theme.websiteLMEL.primaryColor};
      }
    }
    &.green {
      color: ${props => props.theme.websiteLMEL.secondaryColor};
      border-color: ${props => props.theme.websiteLMEL.secondaryColor};
      svg path {
        fill: ${props => props.theme.websiteLMEL.secondaryColor};
      }
      &:hover {
        background-color: ${props => props.theme.websiteLMEL.secondaryColor};
      }
    }
    &.greenDarker {
      color: ${props => props.theme.websiteLMEL.secondaryColorDarker};
      border-color: ${props => props.theme.websiteLMEL.secondaryColorDarker};
      svg path {
        fill: ${props => props.theme.websiteLMEL.secondaryColorDarker};
      }
      &:hover {
        background-color: ${props =>
          props.theme.websiteLMEL.secondaryColorDarker};
      }
    }
    &.orange {
      color: ${props => props.theme.websiteLMEL.activeColor};
      border-color: ${props => props.theme.websiteLMEL.activeColor};
      svg path {
        fill: ${props => props.theme.websiteLMEL.activeColor};
      }
      &:hover {
        background-color: ${props => props.theme.websiteLMEL.activeColor};
      }
    }
    &.grey {
      color: ${props => props.theme.websiteLMEL.greyColorDarker};
      border-color: ${props => props.theme.websiteLMEL.greyColorDarker};
      svg path {
        fill: ${props => props.theme.websiteLMEL.greyColorDarker};
      }
      &:hover {
        background-color: ${props => props.theme.websiteLMEL.greyColorDarker};
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
    background-color: ${props => props.theme.websiteLMEL.secondaryColor};
    border-color: ${props => props.theme.websiteLMEL.secondaryColor};
    cursor: pointer;
  }
  &:active {
    background-color: ${props => props.theme.websiteLMEL.activeColor};
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

export const buttonIcons = [
  'download',
  'checklist',
  'coins',
  'stats',
  'list',
  'github'
];
export type ButtonIcon =
  | 'download'
  | 'checklist'
  | 'coins'
  | 'stats'
  | 'list'
  | 'github';
export const buttonAppearances = ['solid', 'outline'];
export type ButtonAppearance = 'solid' | 'outline';
export const buttonColors = ['blue', 'green', 'greenDarker', 'orange', 'grey'];
export type ButtonColor = 'blue' | 'green' | 'greenDarker' | 'orange' | 'grey';

const IconSvg = (icon: ButtonIcon) => {
  if (icon === 'checklist') return <IconCheckList />;
  if (icon === 'coins') return <IconCoins />;
  if (icon === 'download') return <IconDownload />;
  if (icon === 'github') return <IconGitHub />;
  if (icon === 'list') return <IconList />;
  if (icon === 'stats') return <IconStats />;
};

export interface ButtonProps {
  className?: string;
  icon?: ButtonIcon;
  appearance?: ButtonAppearance;
  color?: ButtonColor;
  text: string;
  details?: string;
  additionalClassName?: string;
  handleClick: () => void;
}

const Button = styled(
  ({
    className,
    icon,
    appearance,
    color,
    text,
    details,
    additionalClassName,
    handleClick
  }: ButtonProps) => {
    return (
      <StyledButton
        className={
          (appearance === 'outline' ? 'outline' : '') +
          (className !== undefined ? ' ' + className : '') +
          (color !== undefined ? ' ' + color : '') +
          (additionalClassName !== undefined ? ' ' + additionalClassName : '')
        }
        onClick={() => handleClick()}
      >
        {icon && <Icon>{IconSvg(icon)}</Icon>}
        <Text>
          {text}
          {details && <Detail>{details}</Detail>}
        </Text>
      </StyledButton>
    );
  }
)``;

export default Button;
