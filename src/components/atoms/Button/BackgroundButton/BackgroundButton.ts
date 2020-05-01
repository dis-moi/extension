import styled from 'styled-components';
import BorderButton from 'components/atoms/Button/BorderButton';

export default styled(BorderButton)`
  color: #fff;
  background-color: ${props => props.theme.Button.default};

  &:hover {
    background-color: ${props => props.theme.Button.hover};
    border-color: ${props => props.theme.Button.hover};

    svg {
      fill: ${props => props.theme.Button.default};
    }
  }

  :disabled:hover {
    color: #fff;
  }

  svg {
    fill: #fff;
  }
`;
