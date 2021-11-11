import styled from 'styled-components';

const SecondaryHeadline = styled.h2`
  line-height: 1.3;
  font-family: ${props => props.theme.website.fontFamily};
  font-weight: normal;
  color: white;
  font-size: 20px;
  margin-top: 0;
  margin-bottom: 15px;
  @media (min-width: ${props => props.theme.tabletWidth}) {
    font-size: 22px;
    margin-bottom: 18px;
  }
  @media (min-width: ${props => props.theme.desktopWidth}) {
    font-size: 24px;
    margin-bottom: 20px;
  }
  @media (min-width: ${props =>
      parseInt(props.theme.desktopWidth) + 100 + 'px'}) {
    font-size: 26px;
    margin-bottom: 22px;
  }
  @media (min-width: ${props =>
      parseInt(props.theme.desktopWidth) + 200 + 'px'}) {
    font-size: 28px;
    margin-bottom: 24px;
  }
`;

export default SecondaryHeadline;
