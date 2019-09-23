import styled from 'styled-components';
import Contributor from '../../atoms/Contributor';

export default styled.div`
  display: flex;
  align-items: center;

  ${Contributor} {
    font-weight: bold;
    color: ${props => props.theme.primaryColor};
  }
`;
