import styled from 'styled-components';

const Content = styled.div`
  line-height: 1.3;
  font-family: ${props => props.theme.website.fontFamily};
  font-weight: normal;
  color: ${props => props.theme.website.greyColorDarker};
  blockquote {
    color: ${props => props.theme.website.primaryColor};
    margin: 30px 0 40px 0;
    font-size: 110%;
    position: relative;
    padding-left: 25px;
    &::before {
      content: '';
      position: absolute;
      display: block;
      height: calc(100% - 8px);
      width: 5px;
      left: 0;
      top: 4px;
      background: ${props => props.theme.website.primaryColor};
    }
  }
  p {
    margin: 0 0 10px 0;
  }
  [id='sommaire'] {
    color: ${props => props.theme.website.primaryColor};
    + ol a {
      color: ${props => props.theme.website.primaryColor};
      &:hover {
        color: ${props => props.theme.website.primaryColorDarker};
      }
    }
  }
  hr {
    color: ${props => props.theme.website.greyColor};
    border-bottom: none;
    margin-top: 60px;
    margin-bottom: 0;
  }
  h2 {
    color: ${props => props.theme.website.secondaryColorDarker};
    padding-top: 50px;
    margin-top: 0;
    margin-bottom: 20px;
  }
  h3 {
    color: ${props => props.theme.website.secondaryColorDarker};
    margin-top: 30px;
    margin-bottom: 15px;
  }
  a {
    color: ${props => props.theme.website.secondaryColor};
    &:hover {
      color: ${props => props.theme.website.secondaryColorDarker};
    }
  }
  img {
    width: 100%;
    max-width: 80%;
    display: block;
    margin: 15px auto;
    border: 1px solid ${props => props.theme.website.greyColor};
  }
  @media (min-width: ${props => props.theme.tabletWidth}) {
  }
  @media (min-width: ${props => props.theme.desktopWidth}) {
  }
`;

export default Content;
