import { Bulleito } from '../../../../atoms/icons';
import { BackgroundButton, Paragraph, Title } from '../../../../atoms';
import React from 'react';
import { StepTypes } from './index';
import { GridContainer, GridItem } from '../../../../atoms/Grid';

export default ({ prev, next }: StepTypes) => (
  <GridContainer direction={'column'} gap={2}>
    <GridContainer gap={2}>
      <Bulleito />
      <Title align={'left'}>
        Tu es arrivé à épingler l&apos;extension DisMoi ?
      </Title>
    </GridContainer>
    <GridContainer>
      <GridItem>
        <Paragraph>Non, je n&apos;ai pas compris</Paragraph>
        <BackgroundButton size={'big'} onClick={prev}>
          Revoir le tuto
        </BackgroundButton>
      </GridItem>
      <GridItem>
        <Paragraph>Oui, j&apos; épinglé DisMoi</Paragraph>
        <BackgroundButton size={'big'} onClick={next}>
          Dernière étape
        </BackgroundButton>
      </GridItem>
    </GridContainer>
  </GridContainer>
);
