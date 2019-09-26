import styled from 'styled-components';

export default styled.h3`
  margin: 0;
  font-size: 17px;
  color: ${props => props.theme.activeColor};

  display: table;
  table-layout: fixed;
  width: 100%;
  white-space: nowrap;

  & > span {
    display: table-cell;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
