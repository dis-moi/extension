import styled from 'styled-components';
import Button from '../Button';

const ButtonWithIcon = styled(Button)`
  display: flex;
  align-items: center;
  font-size: 13px;
  text-decoration: none;

  svg {
    margin-left: 8px;
  }

  &:hover {
    svg {
    }
  }
`;

export default ButtonWithIcon;
