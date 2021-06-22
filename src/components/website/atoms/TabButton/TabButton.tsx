import React from 'react';
import styled from 'styled-components';
import Button, { ButtonColor, ButtonProps } from '../Button/Button';

export interface TabButtonProps {
  className?: string;
  color?: ButtonColor;
  buttons: [ButtonProps, ...ButtonProps[]];
  activeIndex?: number;
  setActiveIndex?: (index: number) => void;
}

const TabButton = styled(
  ({
    className,
    color,
    buttons,
    activeIndex,
    setActiveIndex
  }: TabButtonProps) => {
    return (
      <div className={className}>
        {buttons.map<React.ReactNode>((buttonProps, index) => (
          <Button
            appearance={'outline'}
            color={color || 'blue'}
            key={index}
            additionalClassName={
              activeIndex !== undefined && activeIndex === index
                ? 'active'
                : undefined
            }
            handleClick={() => {
              setActiveIndex && setActiveIndex(index);
              buttonProps.handleClick();
            }}
            text={buttonProps.text}
          />
        ))}
      </div>
    );
  }
)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 1px;
  @media (min-width: ${props => props.theme.tabletWidth}) {
    flex-direction: row;
    margin-bottom: 0;
  }
  button {
    position: relative;
    border-radius: 0;
    margin-top: -1px;
    margin-bottom: -1px;
    margin-left: 0;
    width: calc(100vw - 100px);
    max-width: 350px;
    @media (min-width: ${props => props.theme.tabletWidth}) {
      margin-left: -1px;
      margin-right: -1px;
      width: auto;
      max-width: none;
    }
    &.blue {
      background-color: rgba(40, 85, 162, 0.05);
      &.active {
        color: ${props => props.theme.website.primaryColorDarker};
        background-color: rgba(40, 85, 162, 0.2);
      }
    }
    &.green {
      background-color: rgba(20, 141, 132, 0.05);
      &.active {
        color: ${props => props.theme.website.secondaryColorDarker};
        background-color: rgba(23, 186, 174, 0.2);
      }
    }
    &.orange {
      background-color: rgba(255, 152, 29, 0.05);
      &.active {
        color: ${props => props.theme.website.activeColorDarker};
        background-color: rgba(255, 152, 29, 0.2);
      }
    }
    &:hover {
      z-index: 2;
    }
  }
  button:first-of-type {
    border-radius: ${props => props.theme.website.radiusSmall}
      ${props => props.theme.website.radiusSmall} 0 0;
    @media (min-width: ${props => props.theme.tabletWidth}) {
      border-radius: ${props => props.theme.website.radiusSmall} 0 0
        ${props => props.theme.website.radiusSmall};
    }
  }
  button:last-of-type {
    border-radius: 0 0 ${props => props.theme.website.radiusSmall}
      ${props => props.theme.website.radiusSmall};
    @media (min-width: ${props => props.theme.tabletWidth}) {
      border-radius: 0 ${props => props.theme.website.radiusSmall}
        ${props => props.theme.website.radiusSmall} 0;
    }
  }
`;

export default TabButton;
