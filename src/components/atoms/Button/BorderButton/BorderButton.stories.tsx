import React from 'react';
import { withKnobs, text } from '@storybook/addon-knobs';
import BorderButton from './BorderButton';

export default {
  title: 'Components/Atoms/Buttons/BorderButton',
  decorators: [withKnobs]
};

export const Normal = () => (
  <BorderButton
    dangerouslySetInnerHTML={{ __html: text('content', 'Ajouter') }}
  />
);

Normal.story = {
  name: 'normal'
};
