import styled from 'styled-components';

const TwoColumns = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 310px;
  grid-column-gap: 24px;

  @media (max-width: ${props => props.theme.desktopWidth}) {
    display: block;
  }
`;

export default TwoColumns;
