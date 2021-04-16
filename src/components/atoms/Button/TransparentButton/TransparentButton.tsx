import styled from 'styled-components';
import Button from 'components/atoms/Button/Button';

export default styled(Button)`
  min-width: 0;
  color: ${props => props.theme.colorText};
  background-color: transparent;
  border: none;

  &:hover {
    background-color: transparent;
  }
`;
