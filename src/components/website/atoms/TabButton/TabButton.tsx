import React from 'react';
import styled from 'styled-components';
import Button, { ButtonColor, ButtonProps } from '../Button/Button';

export interface TabButtonProps {
  className?: string;
  color?: ButtonColor;
  buttons: [ButtonProps, ...ButtonProps[]];
}

const TabButton = styled(({ className, color, buttons }: TabButtonProps) => {
  return (
    <div className={className}>
      {buttons.map<React.ReactNode>((buttonProps, index) => (
        <Button
          appearance={'outline'}
          color={color}
          key={index}
          {...buttonProps}
        />
      ))}
    </div>
  );
})`
  display: flex;
  button {
    position: relative;
    border-radius: 0;
    margin-left: -1px;
    margin-right: -1px;
    &.blue {
      background-color: rgba(40, 85, 162, 0.05);
    }
    &.green {
      background-color: rgba(20, 141, 132, 0.05);
    }
    &.orange {
      background-color: rgba(255, 152, 29, 0.05);
    }
    &:hover {
      z-index: 2;
    }
  }
  button:first-of-type {
    border-radius: ${props => props.theme.website.radiusSmall} 0 0
      ${props => props.theme.website.radiusSmall};
  }
  button:last-of-type {
    border-radius: 0 ${props => props.theme.website.radiusSmall}
      ${props => props.theme.website.radiusSmall} 0;
  }
`;

export default TabButton;
