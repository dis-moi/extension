import styled from 'styled-components';
import Button from '../Button';

const ButtonWithIcon = styled(Button)`
  display: flex;
  align-items: center;
  font-size: 13px;
  color: ${props => props.theme.Button.default};

  &:hover {
    color: ${props => props.theme.Button.hover};
  }
`;

export default ButtonWithIcon;
