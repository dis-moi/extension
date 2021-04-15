import React from 'react';
import { withKnobs, text } from '@storybook/addon-knobs';
import Button from './Button';

export default {
  title: 'Components/Atoms/Buttons/Button',
  decorators: [withKnobs]
};

export const Normal = () => (
  <Button dangerouslySetInnerHTML={{ __html: text('content', 'Ajouter') }} />
);

Normal.story = {
  name: 'normal'
};

export const Disabled = () => (
  <Button
    disabled
    dangerouslySetInnerHTML={{ __html: text('content', 'Ajouter') }}
  />
);

Disabled.story = {
  name: 'disabled'
};

export const Loading = () => <Button loading />;

Loading.story = {
  name: 'loading'
};

export const DisabledAndLoading = () => <Button loading />;

DisabledAndLoading.story = {
  name: 'disabled and loading'
};
