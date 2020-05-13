import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { style } from './Anchor';

export default styled(Link)`
  ${style}
  font-weight: normal;
  text-decoration: none;

  & > svg {
    stroke: ${props => props.theme.Button.default};
    transform: rotate(180deg);
    margin-left: 5px;
  }
`;
