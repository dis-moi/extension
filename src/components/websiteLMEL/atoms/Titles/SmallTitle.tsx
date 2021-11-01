import styled from 'styled-components';

const SmallTitle = styled.h3`
  line-height: 1.15;
  font-family: ${props => props.theme.websiteLMEL.fontFamily};
  font-weight: normal;
  color: ${props => props.theme.websiteLMEL.primaryColor};
  font-size: 20px;
  text-align: center;
  margin-top: 0;
  margin-bottom: 10px;
  @media (min-width: ${props => props.theme.tabletWidth}) {
    font-size: 22px;
    margin-bottom: 13px;
  }
  @media (min-width: ${props => props.theme.desktopWidth}) {
    font-size: 24px;
    margin-bottom: 15px;
  }
  @media (min-width: ${props =>
      parseInt(props.theme.desktopWidth) + 100 + 'px'}) {
    font-size: 26px;
    margin-bottom: 17px;
  }
  @media (min-width: ${props =>
      parseInt(props.theme.desktopWidth) + 200 + 'px'}) {
    font-size: 28px;
    margin-bottom: 20px;
  }
`;

export default SmallTitle;
