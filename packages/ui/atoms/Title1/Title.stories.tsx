import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, withKnobs } from '@storybook/addon-knobs';
import { Title1 } from './index';

storiesOf('Components/Atoms/Title1', module)
  .addDecorator(withKnobs)
  .add('normal', () => <Title1>{text('title', 'Some Title')}</Title1>);
