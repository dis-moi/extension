import styled from 'styled-components';
import BorderButton from './BorderButton';

export default styled(BorderButton)`
    display: flex;
    align-items: center;
    margin-top: 25px;
    color: ${props => props.theme.secondaryColor};
    border-color: #fff;

    & > svg {
      width: 12px;
      height: 12px;
      margin-right: 5px;
      fill: ${props => props.theme.secondaryColor};
    }

    &:hover {
      background-color: ${props => props.theme.secondaryColor};
      border-color: ${props => props.theme.secondaryColor};

      & > svg {
        fill: #fff;
      }
    }
`;