import React from 'react';
import { storiesOf } from '@storybook/react';
import Input from './Input';
import { WEBSITE_DOMAIN } from 'app/lmem';

storiesOf('atoms/Forms/Input', module)
  .add('text', () => <Input placeholder="placeholder" type="text" />)
  .add('text with error', () => (
    <Input placeholder="placeholder" type="text" error />
  ))
  .add('email', () => (
    <Input placeholder={`coucou@${WEBSITE_DOMAIN}`} type="email" />
  ))
  .add('email with error', () => (
    <Input placeholder={`coucou@${WEBSITE_DOMAIN}`} type="email" error />
  ));
