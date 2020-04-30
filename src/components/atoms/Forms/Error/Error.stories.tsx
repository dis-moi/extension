import React from 'react';
import { storiesOf } from '@storybook/react';
import Error from './Error';

storiesOf('Components/Atoms/Forms/Error Text', module).add('text', () => (
  <Error>Les champs en rouge sont incorrects ou incomplets</Error>
));
