import styled from 'styled-components';
import Button, { ButtonProps } from 'components/atoms/Button/Button';

export default styled(Button)<ButtonProps>`
  color: ${props => props.theme.Button.default};
  background-color: #fff;

  &:focus {
    background-color: ${props => props.theme.Button.hover};
    border-color: ${props => props.theme.Button.hover};
  }

  svg {
    fill: ${props => props.theme.Button.default};
  }
`;
