import React from 'react';
import { withKnobs, text, select } from '@storybook/addon-knobs';
import BackgroundButton from './BackgroundButton';

export default {
  title: 'Components/Atoms/Buttons/BackgroundButton',
  decorators: [withKnobs]
};

export const Normal = () => (
  <BackgroundButton
    dangerouslySetInnerHTML={{ __html: text('content', 'Ajouter') }}
    size={select('Size ?', { normal: 'normal', big: 'big' }, 'normal')}
  />
);

Normal.story = {
  name: 'normal'
};

export const Disabled = () => (
  <BackgroundButton
    disabled
    dangerouslySetInnerHTML={{ __html: text('content', 'Ajouter') }}
  />
);

Disabled.story = {
  name: 'disabled'
};

export const Loading = () => <BackgroundButton loading />;

Loading.story = {
  name: 'loading'
};

export const DisabledAndLoading = () => <BackgroundButton disabled loading />;

DisabledAndLoading.story = {
  name: 'disabled and loading'
};
