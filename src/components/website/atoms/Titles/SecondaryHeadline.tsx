import styled from 'styled-components';

const SecondaryHeadline = styled.h2`
  line-height: 1.3;
  font-family: 'Lato', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-weight: normal;
  color: white;
  font-size: 20px;
  margin-top: 0;
  margin-bottom: 0;
  @media (min-width: ${props => props.theme.tabletWidth}) {
    font-size: 22px;
  }
  @media (min-width: ${props => props.theme.desktopWidth}) {
    font-size: 24px;
  }
`;

export default SecondaryHeadline;
