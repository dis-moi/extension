import styled from 'styled-components';
import Button, { ButtonProps } from '../../Button';

export default styled(Button)<ButtonProps>`
  height: 28px;
  padding: 5px 12px;
  font-size: 15px;
  color: ${props => props.theme.button};
  text-decoration: none;
  background-color: #fff;
  border: 2px solid ${props => props.theme.button};

  &:hover {
    color: #fff;
    background-color: ${props => props.theme.button};
  }
`;
