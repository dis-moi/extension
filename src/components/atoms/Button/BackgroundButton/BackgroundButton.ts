import styled from 'styled-components';
import BorderButton from 'components/atoms/Button/BorderButton';

export default styled(BorderButton)`
  color: #fff;
  text-transform: none;
  background-color: ${props => props.theme.button};

  &:hover {
    color: ${props => props.theme.button};
    background-color: #fff;

    svg {
      fill: ${props => props.theme.button};
    }
  }

  :disabled:hover {
    color: #fff;
  }

  svg {
    fill: #fff;
  }
`;
