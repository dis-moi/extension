import styled from 'styled-components';

const PrimaryHeadline = styled.h1`
  line-height: 1.1;
  font-family: ${props => props.theme.website.fontFamily};
  font-weight: bold;
  color: white;
  font-size: 36px;
  margin-top: 0;
  margin-bottom: 10px;
  @media (min-width: ${props => props.theme.tabletWidth}) {
    font-size: 38px;
    margin-bottom: 12px;
  }
  @media (min-width: ${props => props.theme.desktopWidth}) {
    font-size: 40px;
    margin-bottom: 14px;
  }
  @media (min-width: ${props =>
      parseInt(props.theme.desktopWidth) + 100 + 'px'}) {
    font-size: 42px;
    margin-bottom: 16px;
  }
  @media (min-width: ${props =>
      parseInt(props.theme.desktopWidth) + 200 + 'px'}) {
    font-size: 44px;
    margin-bottom: 18px;
  }
  span {
    transition: opacity 0.09s, max-height 0.5s;
    display: block;
    overflow: hidden;
    opacity: 1;
    max-height: 500px;
    &.fade {
      opacity: 0;
    }
    &.stop {
      opacity: 0;
      max-height: 0px;
    }
  }
`;

export default PrimaryHeadline;
