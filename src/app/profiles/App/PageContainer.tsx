import styled from 'styled-components';

const PageContainer = styled.div`
  box-sizing: border-box;
  max-width: 100%;
  width: 992px;
  margin: 0 auto 70px;
  font-family: 'Lato', sans-serif;

  @media (max-width: 1005px) {
    padding-right: ${props => props.theme.marginS};
    padding-left: ${props => props.theme.marginS};
  }
`;

export default PageContainer;
