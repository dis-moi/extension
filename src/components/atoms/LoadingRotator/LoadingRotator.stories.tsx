import React from 'react';
import { storiesOf } from '@storybook/react';
import LoadingRotator from './LoadingRotator';
import Loading from '../icons/Loading';

storiesOf('atoms/LoadingRotator', module).add('normal', () => (
  <LoadingRotator>
    <Loading />
  </LoadingRotator>
));
