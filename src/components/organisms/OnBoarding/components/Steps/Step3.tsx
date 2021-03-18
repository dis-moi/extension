import { Bulleito } from '../../../../atoms/icons';
import { BackgroundButton, Paragraph, Title } from '../../../../atoms';
import React from 'react';
import { StepTypes } from './index';
import { GridContainer, GridItem } from '../../../../atoms/Grid';

export default ({ prev, close }: StepTypes) => (
  <GridContainer direction={'column'}>
    <GridContainer gap={2}>
      <Bulleito />
      <Title align={'left'}>Dernière étape</Title>
    </GridContainer>
    <Paragraph>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis hendrerit mi
      ut tincidunt rhoncus. Suspendisse iaculis placerat consectetur. Ut mattis
      turpis sed lorem facilisis hendrerit. Nam in leo vestibulum, sodales leo
      a, ultrices diam. Sed volutpat pellentesque libero, vitae euismod nibh
      consectetur congue. Phasellus sit amet tempus tortor. Maecenas faucibus
      arcu nibh, vitae imperdiet sem sollicitudin a. Suspendisse eleifend
      elementum tellus vitae tempus.
    </Paragraph>
    <GridContainer justifyContent={'space-around'}>
      <GridItem>
        <BackgroundButton size={'big'} onClick={prev}>
          Revenir
        </BackgroundButton>
      </GridItem>
      <GridItem>
        <BackgroundButton size={'big'} onClick={close}>
          Terminer
        </BackgroundButton>
      </GridItem>
    </GridContainer>
  </GridContainer>
);
