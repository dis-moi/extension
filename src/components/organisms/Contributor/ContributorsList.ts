import styled from 'styled-components';

const ContributorsList = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(450px, 1fr));
  grid-gap: 24px;

  @media (max-width: ${props => props.theme.desktopWidth}) {
    grid-column-gap: ${props => props.theme.fontSizeDefault};
    grid-row-gap: ${props => props.theme.fontSizeDefault};
  }
`;
export default ContributorsList;
