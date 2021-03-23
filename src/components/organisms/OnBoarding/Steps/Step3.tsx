import { Bulleito } from 'components/atoms/icons';
import { BackgroundButton, Title } from 'components/atoms';
import React from 'react';
import { StepTypes } from './index';
import { GridContainer, GridItem } from 'components/atoms/Grid';
import Text from '../components/Text';

export default ({ prev, close }: StepTypes) => (
  <GridContainer direction={'column'}>
    <GridContainer gap={2}>
      <Bulleito />
      <Title align={'left'}>Bienvenue !</Title>
    </GridContainer>
    <Text align={'left'}>
      Lors de l&apos;installation, nous vous avons présélectionné plusieurs
      éclaireurs, plutôt consensuels. A vous de compléter et faire les choix
      définitifs !<br />
      Une fois que vous avez terminé, vous pouvez revenir à votre navigation
      normale sur le web. Les conseils et infos de vos éclaireurs apparaitront
      directement sur les pages web que vous visitez.
    </Text>
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
