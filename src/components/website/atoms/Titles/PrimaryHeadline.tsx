import styled from 'styled-components';

const PrimaryHeadline = styled.h1`
  line-height: 1.1;
  font-family: 'Lato', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-weight: bold;
  color: white;
  font-size: 40px;
  margin-top: 0;
  margin-bottom: 15px;
  @media (min-width: ${props => props.theme.tabletWidth}) {
    font-size: 42px;
    margin-bottom: 18px;
  }
  @media (min-width: ${props => props.theme.desktopWidth}) {
    font-size: 44px;
    margin-bottom: 21px;
  }
  @media (min-width: ${props =>
      parseInt(props.theme.desktopWidth) + 100 + 'px'}) {
    font-size: 46px;
    margin-bottom: 24px;
  }
  @media (min-width: ${props =>
      parseInt(props.theme.desktopWidth) + 200 + 'px'}) {
    font-size: 48px;
    margin-bottom: 27px;
  }
`;

export default PrimaryHeadline;
