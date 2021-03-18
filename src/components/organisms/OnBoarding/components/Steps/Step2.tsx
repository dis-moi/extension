import { Bulleito } from '../../../../atoms/icons';
import { BackgroundButton, Paragraph, Title } from '../../../../atoms';
import React from 'react';
import { StepTypes } from './index';
import { GridContainer, GridItem } from '../../../../atoms/Grid';

export default ({ prev, next }: StepTypes) => (
  <>
    <GridContainer>
      <GridItem col={1}>
        <Bulleito />
      </GridItem>
      <GridItem col={2}>
        <Title align={'left'}>
          Tu es arrivé à épingler l&apos;extension DisMoi ?
        </Title>
      </GridItem>
    </GridContainer>
    <GridContainer>
      <GridItem direction={'column'}>
        <Paragraph>Non, je n&apos;ai pas compris</Paragraph>
        <BackgroundButton onClick={prev}>Revoir le tuto</BackgroundButton>
      </GridItem>
      <GridItem direction={'column'}>
        <Paragraph>Oui, j&apos; épinglé DisMoi</Paragraph>
        <BackgroundButton onClick={next}>Dernière étape</BackgroundButton>
      </GridItem>
    </GridContainer>
  </>
);
