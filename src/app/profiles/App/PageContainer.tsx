import styled from 'styled-components';

const PageContainer = styled.div`
  box-sizing: border-box;
  max-width: 100%;
  width: 1032px;
  min-height: 100vh;
  margin: 0 auto;
  padding-right: 20px;
  padding-left: 20px;
  padding-bottom: 70px;
  font-family: 'Lato', sans-serif;

  @media (max-width: ${props => props.theme.desktopWidth}) {
    padding: 0 0 50px 0;
  }
`;

export default PageContainer;
