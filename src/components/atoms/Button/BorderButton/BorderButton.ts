import styled from 'styled-components';
import Button, { ButtonProps } from 'components/atoms/Button/Button';

export default styled(Button)<ButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 130px;
  height: 28px;
  padding: 0 12px;
  font-size: 15px;
  color: ${props => props.theme.button};
  text-decoration: none;
  background-color: #fff;
  border: 2px solid ${props => props.theme.button};

  &:hover,
  &:focus,
  &:active {
    color: #fff;
  }

  &:hover {
    background-color: ${props => props.theme.basicButton.hover};
    border-color: ${props => props.theme.basicButton.hover};

    svg {
      fill: #fff;
    }
  }
  &:focus {
    background-color: ${props => props.theme.basicButton.clicked};
    border-color: ${props => props.theme.basicButton.clicked};
  }

  svg {
    fill: ${props => props.theme.button};
  }
`;
