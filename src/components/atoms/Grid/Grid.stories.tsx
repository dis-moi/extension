import React from 'react';
import { storiesOf } from '@storybook/react';
import { GridContainer, GridItem } from './';
import { text, withKnobs } from '@storybook/addon-knobs';

storiesOf('Components/Atoms/Grid', module)
  .addDecorator(withKnobs)
  .add('normal', () => (
    <GridContainer>
      <GridItem>{text('text col1', 'Some Title')}</GridItem>
      <GridItem>{text('text col2', 'Some Title')}</GridItem>
    </GridContainer>
  ));
