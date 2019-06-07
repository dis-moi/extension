import React from 'react';
import { storiesOf } from '@storybook/react';
import Textarea from './Textarea';

storiesOf('atoms/Forms/Textarea', module).add('normal', () => (
  <Textarea placeholder="Écrire le message que vous souhaitez publier" />
));
