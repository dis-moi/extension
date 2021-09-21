import styled from 'styled-components';

const PageContainer = styled.div`
  box-sizing: border-box;
  max-width: 100%;
  width: 1032px;
  min-height: 100vh;
  margin: 0 auto;
  padding: 50px 20px 70px 20px;
  font-family: 'Lato', sans-serif;

  @media (max-width: ${props => props.theme.desktopWidth}) {
    padding: 0 0 50px 0;
  }
`;

export default PageContainer;
