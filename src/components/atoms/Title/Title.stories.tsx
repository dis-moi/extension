import React from 'react';
import { storiesOf } from '@storybook/react';
import Title from './Title';
import { text, withKnobs } from '@storybook/addon-knobs';

storiesOf('atoms/Title', module)
  .addDecorator(withKnobs)
  .add('normal', () => <Title>{text('title', 'Some Title')}</Title>);
