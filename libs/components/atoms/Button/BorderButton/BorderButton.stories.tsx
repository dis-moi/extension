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

export const Disabled = () => (
  <BorderButton
    dangerouslySetInnerHTML={{ __html: text('content', 'Ajouter') }}
    disabled
  />
);

Disabled.story = {
  name: 'disabled'
};

export const Loading = () => <BorderButton loading>Ajouter</BorderButton>;

Loading.story = {
  name: 'loading'
};

export const DisabledAndLoading = () => (
  <BorderButton loading disabled>
    Ajouter
  </BorderButton>
);

DisabledAndLoading.story = {
  name: 'disabled and loading'
};
