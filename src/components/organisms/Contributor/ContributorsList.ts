import styled from 'styled-components';

const ContributorsList = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-column-gap: 30px;
  grid-row-gap: 30px;

  @media (max-width: 975px) {
    grid-column-gap: 15px;
    grid-row-gap: 15px;
  }
`;
export default ContributorsList;
