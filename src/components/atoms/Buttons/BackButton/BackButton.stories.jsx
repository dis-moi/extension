import React from 'react';
import { storiesOf } from '@storybook/react';
import BackButton from './BackButton';

storiesOf('atoms/Buttons/BackButton', module)
  .add('normal', () => <BackButton />);
