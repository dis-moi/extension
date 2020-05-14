import styled from 'styled-components';

export default styled.h3`
  margin: 0;
  font-size: ${props => props.theme.fontSizeDefault};
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
