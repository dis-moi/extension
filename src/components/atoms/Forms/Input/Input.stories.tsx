import React from 'react';
import { storiesOf } from '@storybook/react';
import Input from './Input';

storiesOf('atoms/Forms/Input', module)
  .add('text', () => <Input placeholder="placeholder" type="text" />)
  .add('text with error', () => (
    <Input placeholder="placeholder" type="text" error />
  ))
  .add('email', () => <Input placeholder="coucou@bulles.fr" type="email" />)
  .add('email with error', () => (
    <Input placeholder="coucou@bulles.fr" type="email" error />
  ));
