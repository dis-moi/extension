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
  border-radius: ${props => props.theme.website.radiusSmall};
  transition: color 0.1s, background-color 0.1s;
  line-height: 1;
  font-family: ${props => props.theme.website.fontFamily};
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
  &.greenDarker {
    background-color: ${props => props.theme.website.secondaryColorDarker};
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
    border: 1.5px solid;
    background-color: transparent;
    padding-left: 9px;
    padding-right: 9px;
    padding-bottom: 3px;
    svg path {
      fill: ${props => props.theme.website.primaryColor};
    }
    &.blue {
      color: ${props => props.theme.website.primaryColor};
      border-color: ${props => props.theme.website.primaryColor};
      svg path {
        fill: ${props => props.theme.website.primaryColor};
      }
      &:hover {
        background-color: ${props => props.theme.website.primaryColor};
      }
    }
    &.green {
      color: ${props => props.theme.website.secondaryColor};
      border-color: ${props => props.theme.website.secondaryColor};
      svg path {
        fill: ${props => props.theme.website.secondaryColor};
      }
      &:hover {
        background-color: ${props => props.theme.website.secondaryColor};
      }
    }
    &.greenDarker {
      color: ${props => props.theme.website.secondaryColorDarker};
      border-color: ${props => props.theme.website.secondaryColorDarker};
      svg path {
        fill: ${props => props.theme.website.secondaryColorDarker};
      }
      &:hover {
        background-color: ${props => props.theme.website.secondaryColorDarker};
      }
    }
    &.orange {
      color: ${props => props.theme.website.activeColor};
      border-color: ${props => props.theme.website.activeColor};
      svg path {
        fill: ${props => props.theme.website.activeColor};
      }
      &:hover {
        background-color: ${props => props.theme.website.activeColor};
      }
    }
    &.grey {
      color: ${props => props.theme.website.greyColorDarker};
      border-color: ${props => props.theme.website.greyColorDarker};
      svg path {
        fill: ${props => props.theme.website.greyColorDarker};
      }
      &:hover {
        background-color: ${props => props.theme.website.greyColorDarker};
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
    border-color: ${props => props.theme.website.secondaryColor};
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
