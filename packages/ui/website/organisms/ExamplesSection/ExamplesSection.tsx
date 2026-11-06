import React from 'react';
import styled from 'styled-components';
import Section from '../../atoms/Section/Section';
import GridContainer from '../../atoms/Grid/GridContainer';
import GridRow from '../../atoms/Grid/GridRow';
import GridCol from '../../atoms/Grid/GridCol';
import ExamplesSlider, {
  examples,
} from '../../molecules/ExamplesSlider/ExamplesSlider';

const StyledGridRow = styled(GridRow)`
  justify-content: center;
`;

const StyledGridCol = styled(GridCol)`
  width: 100%;
`;

const StyledExamplesSlider = styled(ExamplesSlider)``;

export interface ExamplesSectionProps {
  className?: string;
}

const ExamplesSection = styled((props: ExamplesSectionProps) => {
  return (
    <Section {...props}>
      <GridContainer>
        <StyledGridRow>
          <StyledGridCol>
            <StyledExamplesSlider examples={examples} />
          </StyledGridCol>
        </StyledGridRow>
      </GridContainer>
    </Section>
  );
})`
  background: #f5f5f5;
`;

export default ExamplesSection;
