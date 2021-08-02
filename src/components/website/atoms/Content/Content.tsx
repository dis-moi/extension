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
    h2 {
      font-size: 24px;
      color: ${props => props.theme.website.primaryColor};
      margin-top: 0;
      padding-top: 0;
      margin-bottom: 15px;
    }
    a {
      color: ${props => props.theme.website.primaryColorDarker};
      &:hover {
        color: black;
      }
    }
  }
  p {
    margin: 0 0 10px 0;
  }
  [id='sommaire'] {
    color: ${props => props.theme.website.primaryColor};
    + ol a,
    + ul a {
      color: ${props => props.theme.website.primaryColor};
      &:hover {
        color: black;
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
    font-size: 24px;
  }
  h3 {
    color: ${props => props.theme.website.secondaryColorDarker};
    margin-top: 30px;
    margin-bottom: 15px;
    font-size: 20px;
  }
  h4 {
    color: ${props => props.theme.website.secondaryColorDarker};
    margin-top: 20px;
    margin-bottom: 12px;
    font-size: 18px;
  }
  h5 {
    color: ${props => props.theme.website.secondaryColorDarker};
    margin-top: 15px;
    margin-bottom: 10px;
    font-size: 16px;
  }
  a {
    color: ${props => props.theme.website.secondaryColorDarker};
    &:hover {
      color: black;
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
