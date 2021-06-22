import styled from 'styled-components';

const SectionTitle = styled.h2`
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 1.2;
  font-family: ${props => props.theme.website.fontFamily};
  font-weight: bold;
  color: ${props => props.theme.website.primaryColor};
  font-size: 28px;
  text-align: center;
  margin-top: 0;
  margin-bottom: 22px;
  @media (min-width: ${props => props.theme.tabletWidth}) {
    font-size: 30px;
    margin-bottom: 25px;
  }
  @media (min-width: ${props => props.theme.desktopWidth}) {
    font-size: 32px;
    margin-bottom: 27px;
  }
  @media (min-width: ${props =>
      parseInt(props.theme.desktopWidth) + 100 + 'px'}) {
    font-size: 34px;
    margin-bottom: 29px;
  }
  @media (min-width: ${props =>
      parseInt(props.theme.desktopWidth) + 200 + 'px'}) {
    font-size: 36px;
    margin-bottom: 31px;
  }
`;

export default SectionTitle;
