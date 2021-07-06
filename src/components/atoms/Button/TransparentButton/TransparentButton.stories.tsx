import React from 'react';
import { withKnobs, text } from '@storybook/addon-knobs';
import TransparentButton from './TransparentButton';

export default {
  title: 'Components/Atoms/Buttons/TransparentButton',
  decorators: [withKnobs]
};

export const Normal = () => (
  <TransparentButton
    dangerouslySetInnerHTML={{ __html: text('content', 'Ajouter') }}
  />
);

Normal.story = {
  name: 'normal'
};
