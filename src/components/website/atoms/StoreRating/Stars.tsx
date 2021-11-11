import React from 'react';
import styled from 'styled-components';
import Star from './Star';

export interface StartsProps {
  className?: string;
}

const Stars = styled(({ className }: StartsProps) => (
  <div className={className}>
    <Star />
    <Star />
    <Star />
    <Star />
    <Star />
  </div>
))`
  height: 20px;
  svg {
    height: inherit;
    margin-right: 5px;
    path {
      fill: white;
    }
    path:first-of-type {
      opacity: 0;
    }
    &:last-of-type {
      path:first-of-type {
        opacity: 1;
      }
      path:last-of-type {
        opacity: 0.5;
      }
    }
  }
`;

export default Stars;
