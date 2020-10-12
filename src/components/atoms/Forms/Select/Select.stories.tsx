import React from 'react';
import { storiesOf } from '@storybook/react';
import Select from './Select';

storiesOf('Components/Atoms/Forms/Select', module)
  .add('normal', () => (
    <Select>
      <option value="">Plop</option>
    </Select>
  ))
  .add('error', () => (
    <Select placeholder="Écrire le message que vous souhaitez publier" error />
  ));
