import styled from 'styled-components';

const SectionTitle = styled.h2`
  line-height: 1.2;
  font-family: ${props => props.theme.website.fontFamily};
  font-weight: normal;
  color: ${props => props.theme.website.secondaryColor};
  font-size: 30px;
  text-align: center;
  margin-top: 0;
  margin-bottom: 20px;
  @media (min-width: ${props => props.theme.tabletWidth}) {
    font-size: 32px;
    margin-bottom: 23px;
  }
  @media (min-width: ${props => props.theme.desktopWidth}) {
    font-size: 34px;
    margin-bottom: 25px;
  }
  @media (min-width: ${props =>
      parseInt(props.theme.desktopWidth) + 100 + 'px'}) {
    font-size: 36px;
    margin-bottom: 27px;
  }
  @media (min-width: ${props =>
      parseInt(props.theme.desktopWidth) + 200 + 'px'}) {
    font-size: 38px;
    margin-bottom: 30px;
  }
`;

export default SectionTitle;
