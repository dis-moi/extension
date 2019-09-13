import styled from 'styled-components';
import Avatar from '../../molecules/Avatar/Avatar';
import Contributor from '../../atoms/Contributor';

export default styled.div`
  display: flex;
  align-items: center;

  ${Contributor} {
    font-weight: bold;
    color: ${props => props.theme.primaryColor};
  }

  ${Avatar} {
    width: 40px;
    height: 40px;

    & > svg {
      width: 25px;
      height: 25px;
    }
  }
`;
