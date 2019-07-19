import React from 'react';
import { storiesOf } from '@storybook/react';
import LoadingIcon from './LoadingIcon';
import LoadingWhite from '../icons/LoadingWhite';

storiesOf('atoms/LoadingIcon', module).add('normal', () => (
  <LoadingIcon>
    <LoadingWhite />
  </LoadingIcon>
));
