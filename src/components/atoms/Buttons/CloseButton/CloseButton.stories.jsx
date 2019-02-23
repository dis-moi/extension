import React from 'react';
import { storiesOf } from '@storybook/react';
import CloseButton from './CloseButton';

storiesOf('atoms/Buttons/CloseButton', module)
  .add('normal', () => <CloseButton />);
