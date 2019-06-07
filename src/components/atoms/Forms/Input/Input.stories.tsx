import React from 'react';
import { storiesOf } from '@storybook/react';
import Input from './Input';

storiesOf('atoms/Forms/Input', module)
  .add('text', () => (
    <Input
      placeholder="Source (facultatif). Exemple : www.nom-de-site.com"
      type="text"
    />
  ))
  .add('email', () => <Input placeholder="coucou@lmem.net" type="email" />);
