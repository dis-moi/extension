import React from 'react';
import Textarea from './Textarea';

export default {
  title: 'Components/Atoms/Forms/Textarea'
};

export const Normal = () => (
  <Textarea placeholder="Écrire le message que vous souhaitez publier" />
);

Normal.story = {
  name: 'normal'
};

export const Error = () => (
  <Textarea placeholder="Écrire le message que vous souhaitez publier" error />
);

Error.story = {
  name: 'error'
};
