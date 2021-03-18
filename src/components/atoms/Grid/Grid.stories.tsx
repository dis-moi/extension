import React from 'react';
import { storiesOf } from '@storybook/react';
import { GridContainer, GridItem } from './';
import { number, text, withKnobs } from '@storybook/addon-knobs';

storiesOf('Components/Atoms/Grid', module)
  .addDecorator(withKnobs)
  .add('normal', () => (
    <GridContainer>
      <GridItem col={number('col1 size', 1)}>
        {text('text col1', 'Some Title')}
      </GridItem>
      <GridItem col={number('col2 size', 1)}>
        {text('text col2', 'Some Title')}
      </GridItem>
    </GridContainer>
  ));
