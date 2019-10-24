import styled from 'styled-components';
import BorderButton from 'components/atoms/Button/BorderButton';

export default styled(BorderButton)`
  color: #fff;
  background-color: ${props => props.theme.button};

  &:hover {
    background-color: ${props => props.theme.backgroundButton.hover};
    border-color: ${props => props.theme.backgroundButton.hover};

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
