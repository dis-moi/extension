import styled from 'styled-components';
import Button, { ButtonProps } from 'components/atoms/Button/Button';

export default styled(Button)<ButtonProps>`
  display: inline-block;
  min-width: 130px;
  padding: 3px 12px;
  text-decoration: none;
  text-transform: none;
  background-color: #fff;
  border-radius: ${props => props.theme.radius};

  &:hover,
  &:focus,
  &:active {
    color: #fff;
  }

  &:hover {
    svg {
      fill: #fff;
    }
  }

  &:focus {
  }

  svg {
  }
`;
