import styled from 'styled-components';

const TwoColumns = styled.div`
  display: grid;
  grid-template-columns: auto 310px;
  grid-column-gap: ${props => props.theme.marginM};
`;

export default TwoColumns;
