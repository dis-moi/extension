import styled from 'styled-components';
import BorderButton from 'components/atoms/Buttons/BorderButton';

export default styled(BorderButton)`
  color: #fff;
  text-transform: none;
  background-color: ${props => props.theme.button};

  &:hover {
    color: ${props => props.theme.button};
    background-color: #fff;
  }
`;
