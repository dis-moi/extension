import styled from 'styled-components';

const GridRow = styled.div`
  margin-right: -15px;
  margin-left: -15px;
  @media (min-width: ${props => props.theme.tabletWidth}) {
    display: flex;
    align-items: center;
  }
`;

export default GridRow;
