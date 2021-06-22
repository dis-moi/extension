import React from 'react';
import styled from 'styled-components';
import Section from '../../atoms/Section/Section';
import GridContainer from '../../atoms/Grid/GridContainer';
import GridRow from '../../atoms/Grid/GridRow';
import GridCol from '../../atoms/Grid/GridCol';
import ExamplesSlider, {
  examples
} from '../../molecules/ExamplesSlider/ExamplesSlider';
import TabButton from '../../atoms/TabButton/TabButton';

const StyledGridRow = styled(props => <GridRow {...props} />)`
  justify-content: center;
`;

const StyledGridCol = styled(props => <GridCol {...props} />)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`;

const StyledExamplesSlider = styled(props => <ExamplesSlider {...props} />)``;

const StyledTabButton = styled(props => <TabButton {...props} />)`
  margin: 35px auto 0 auto;
`;

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
            <StyledTabButton
              buttons={[
                { text: 'Alertes Arnaques' },
                { text: 'Alternatives conso' },
                { text: 'Infos éclairantes' }
              ]}
              color="green"
            />
          </StyledGridCol>
        </StyledGridRow>
      </GridContainer>
    </Section>
  );
})`
  background: #f5f5f5;
`;

export default ExamplesSection;
