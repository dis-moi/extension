import styled from 'styled-components';
import { Link } from '../Link';

export default styled.h2`
  margin: 0;
  padding-bottom: 0;
  font-size: ${props => props.theme.fontSizeDefault};
  color: ${props => props.theme.activeColor};

  display: table;
  table-layout: fixed;
  width: 100%;
  white-space: nowrap;

  ${Link} {
    display: table-cell;
    overflow: hidden;
    font-weight: bold;
    text-overflow: ellipsis;
  }

  @media (max-width: ${props => props.theme.tabletWidth}) {
    font-size: 20px;
  }
`;
