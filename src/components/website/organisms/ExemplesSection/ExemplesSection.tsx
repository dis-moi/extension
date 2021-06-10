import React from 'react';
import styled from 'styled-components';
import Section from '../../atoms/Section/Section';
import GridContainer from '../../atoms/Grid/GridContainer';
import GridRow from '../../atoms/Grid/GridRow';
import GridCol from '../../atoms/Grid/GridCol';
import SectionTitle from '../../atoms/Titles/SectionTitle';

const StyledGridRow = styled(props => <GridRow {...props} />)`
  justify-content: center;
`;

const StyledGridCol = styled(props => <GridCol {...props} />)`
  text-align: center;

  @media (min-width: ${props => props.theme.tabletWidth}) {
  }
`;

export interface ExemplesSectionProps {
  className?: string;
}

const ExemplesSection = styled((props: ExemplesSectionProps) => {
  return (
    <Section {...props}>
      <GridContainer>
        <SectionTitle>
          Par exemple, un guide spécialisé vous suggère une alternative locale
        </SectionTitle>
        <StyledGridRow>
          <StyledGridCol>CAROUSSEL</StyledGridCol>
        </StyledGridRow>
      </GridContainer>
    </Section>
  );
})`
  background: #f5f5f5;
`;

export default ExemplesSection;
