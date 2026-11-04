import React from 'react';
import styled from 'styled-components';

interface Props {
  className?: string;
}

const Bubble = ({ className }: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    width="16"
    height="16"
    className={className}
  >
    <path
      d="M4 16a4.389 4.389 0 01-1 0c-.333-.18 0-.632 0-1v-3a5.4 5.4 0 01-3-5c0-3.882 3.364-7 8-7s8 3.118 8 7-3.365 7-8 7H7l-3 2c-.166.109.196 0 0 0z"
      fill="gray"
    />
  </svg>
);
export default styled(Bubble)``;
