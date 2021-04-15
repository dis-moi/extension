import styled from 'styled-components';
import Button, { ButtonProps } from 'libs/components/atoms/Button/Button';

export default styled(Button)<ButtonProps>`
  display: inline-block;
  min-width: 130px;
  padding: ${props => (props.size === 'big' ? '8px 19px' : ' 3px 12px')};
  color: ${props => props.theme.Button.default};
  text-decoration: none;
  text-transform: none;
  background-color: #fff;
  border-radius: ${props => props.theme.radius};
  border: 2px solid ${props => props.theme.Button.default};

  &:hover,
  &:focus,
  &:active {
    color: #fff;
  }

  &:hover {
    background-color: ${props => props.theme.Button.hover};
    border-color: ${props => props.theme.Button.hover};

    svg {
      fill: #fff;
    }
  }

  &:focus {
    background-color: ${props => props.theme.Button.hover};
    border-color: ${props => props.theme.Button.hover};
  }

  svg {
    fill: ${props => props.theme.Button.default};
  }
`;
