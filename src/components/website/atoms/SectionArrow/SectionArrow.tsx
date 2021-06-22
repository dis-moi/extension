import React from 'react';
import styled from 'styled-components';

export interface SectionArrowProps {
  className?: string;
  handleClick: () => void;
}

export default styled(({ className, handleClick }: SectionArrowProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1000 425"
    className={className}
    onClick={() => handleClick()}
  >
    <path d="M500 425L31.8 126.7c-32-20.4-41.4-62.9-21-94.9 20.4-32 62.9-41.4 94.9-21L500 262.1 894.4 10.8c32-20.4 74.5-11 94.9 21 20.4 32 11 74.5-21 94.9L500 425z" />
  </svg>
))`
  width: 40px;
  opacity: 0.5;
  cursor: pointer;
  transform-origin: center;
  &:hover {
    opacity: 1;
  }
`;
