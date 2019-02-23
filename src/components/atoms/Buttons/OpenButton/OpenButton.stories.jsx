import React from 'react';
import { storiesOf } from '@storybook/react';
import OpenButton from './OpenButton';

storiesOf('atoms/Buttons/OpenButton', module)
  .add('normal', () => <OpenButton />);
