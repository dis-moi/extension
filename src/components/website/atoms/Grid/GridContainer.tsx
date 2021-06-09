import styled from 'styled-components';

const GridContainer = styled.div`
  padding-right: 15px;
  padding-left: 15px;
  @media (min-width: ${props => props.theme.tabletWidth}) {
    margin-right: auto;
    margin-left: auto;
    width: 738px;
  }
  @media (min-width: ${props => props.theme.desktopWidth}) {
    width: 962px;
  }
  @media (min-width: ${props =>
      parseInt(props.theme.desktopWidth) + 100 + 'px'}) {
    width: 1062px;
  }
  @media (min-width: ${props =>
      parseInt(props.theme.desktopWidth) + 200 + 'px'}) {
    width: 1162px;
  }
`;

export default GridContainer;
