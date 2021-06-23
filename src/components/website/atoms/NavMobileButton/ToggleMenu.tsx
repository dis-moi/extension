import React from 'react';
import styled from 'styled-components';

export interface ToggleMenuProps {
  className?: string;
  handleClick: () => void;
}

export default styled(({ className, handleClick }: ToggleMenuProps) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1000 1000"
    onClick={() => handleClick()}
    role="button"
  >
    <path
      fill="white"
      d="M921.1 421H78.9C35.3 421 0 456.4 0 500s35.3 79 78.9 79H921c43.6 0 78.9-35.3 78.9-78.9.1-43.7-35.2-79.1-78.8-79.1zm0 314.4H78.9C35.3 735.4 0 770.7 0 814.3c0 43.6 35.3 78.9 78.9 78.9H921c43.6 0 78.9-35.3 78.9-78.9.1-43.6-35.2-78.9-78.8-78.9zm0-628.7H78.9C35.3 106.7 0 142 0 185.6c0 43.6 35.3 78.9 78.9 78.9H921c43.6 0 78.9-35.3 78.9-78.9.1-43.6-35.2-78.9-78.8-78.9z"
    />
  </svg>
))`
  width: 25px;
  height: 25px;
  cursor: pointer;
  &:hover {
    path {
      fill: ${props => props.theme.website.secondaryColor};
    }
  }
  @media (min-width: ${props => props.theme.tabletWidth}) {
    display: none;
  }
`;
