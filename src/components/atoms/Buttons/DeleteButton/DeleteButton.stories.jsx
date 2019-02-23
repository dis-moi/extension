import React from 'react';
import { storiesOf } from '@storybook/react';
import DeleteButton from './DeleteButton';

storiesOf('atoms/Buttons/DeleteButton', module)
  .add('normal', () => <DeleteButton />);
