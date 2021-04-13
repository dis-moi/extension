import React from 'react';
import { WEBSITE_DOMAIN } from 'app/lmem';
import Input from './Input';

export default {
  title: 'Components/Atoms/Forms/Input'
};

export const Text = () => <Input placeholder="placeholder" type="text" />;

Text.story = {
  name: 'text'
};

export const TextWithError = () => (
  <Input placeholder="placeholder" type="text" error />
);

TextWithError.story = {
  name: 'text with error'
};

export const Email = () => (
  <Input placeholder={`coucou@${WEBSITE_DOMAIN}`} type="email" />
);

Email.story = {
  name: 'email'
};

export const EmailWithError = () => (
  <Input placeholder={`coucou@${WEBSITE_DOMAIN}`} type="email" error />
);

EmailWithError.story = {
  name: 'email with error'
};
