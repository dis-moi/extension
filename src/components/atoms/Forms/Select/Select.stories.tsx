import React from 'react';
import Select from './Select';

export default {
  title: 'Components/Atoms/Forms/Select'
};

export const Normal = () => (
  <Select>
    <option value="">Plop</option>
  </Select>
);

Normal.story = {
  name: 'normal'
};

export const Error = () => (
  <Select placeholder="Écrire le message que vous souhaitez publier" error />
);

Error.story = {
  name: 'error'
};
