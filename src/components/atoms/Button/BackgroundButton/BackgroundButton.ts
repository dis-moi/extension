import styled from 'styled-components';
import Button, { ButtonProps } from '../Button';

export interface BackgroundButtonProps extends ButtonProps {
  bordered?: boolean;
}

export default styled(Button)<BackgroundButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 130px;
  height: 28px;
  padding: 0 12px;
  font-size: 15px;
  color: ${({ bordered, theme }) => (bordered ? theme.button : '#fff')};
  text-decoration: none;
  background-color: ${({ bordered, theme }) =>
    bordered ? '#fff' : theme.button};
  border-radius: 7px;
  border: 2px solid ${props => props.theme.button};

  &:hover,
  &:focus,
  &:active {
    color: ${({ bordered }) => (bordered ? '#000' : '#fff')};
  }

  svg {
    fill: ${({ bordered, theme }) => (bordered ? theme.button : '#fff')};
  }

  &:hover {
    background-color: ${({ bordered, theme }) =>
      bordered ? theme.button : theme.backgroundButton.hover};
    border-color: ${({ bordered, theme }) =>
      bordered ? theme.button : theme.backgroundButton.hover};

    svg {
      fill: ${({ bordered, theme }) => (bordered ? '#fff' : theme.button)};
    }
  }

  &:focus {
    background-color: ${({ bordered, theme }) =>
      bordered ? '#fff' : theme.button};
    border-color: ${props => props.theme.button};
  }

  :disabled:hover {
    color: #fff;
  }
`;
