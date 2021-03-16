import React from 'react';
import { storiesOf } from '@storybook/react';
import Title from './Title1';
import { text, withKnobs } from '@storybook/addon-knobs';

storiesOf('Components/Atoms/Title', module)
  .addDecorator(withKnobs)
  .add('normal', () => <Title>{text('title', 'Some Title')}</Title>);
