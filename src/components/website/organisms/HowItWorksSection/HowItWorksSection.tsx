import React from 'react';
import styled from 'styled-components';
import Section from '../../atoms/Section/Section';
import GridContainer from '../../atoms/Grid/GridContainer';
import GridRow from '../../atoms/Grid/GridRow';
import GridCol from '../../atoms/Grid/GridCol';
import SectionTitle from '../../atoms/Titles/SectionTitle';
import Steps, { steps } from '../../molecules/Steps/Steps';

const StyledGridRow = styled(props => <GridRow {...props} />)`
  justify-content: center;
`;

const StyledGridCol = styled(props => <GridCol {...props} />)`
  width: 100%;
`;

export interface HowItWorksSectionProps {
  className?: string;
}

const HowItWorksSection = styled((props: HowItWorksSectionProps) => {
  return (
    <Section {...props}>
      <GridContainer>
        <StyledGridRow>
          <StyledGridCol>
            <SectionTitle>Comment ça marche ?</SectionTitle>
            <Steps steps={steps} />
          </StyledGridCol>
        </StyledGridRow>
      </GridContainer>
    </Section>
  );
})`
  background: white;
`;

export default HowItWorksSection;
