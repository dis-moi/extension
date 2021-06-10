import styled from 'styled-components';

const Section = styled.section`
  position: relative;
  overflow: hidden;
  padding: 30px 0;
  @media (min-width: ${props => props.theme.tabletWidth}) {
    padding: 40px 0;
  }
  @media (min-width: ${props => props.theme.desktopWidth}) {
    padding: 50px 0;
  }
`;

export default Section;
