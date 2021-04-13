import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { generateContributor } from 'test/fakers/generateContributor';
import Avatar from './Avatar';

export default {
  title: 'Components/Molecules/Avatar',
  decorators: [withKnobs]
};

export const Normal = () => (
  <Avatar contributor={generateContributor()} size="normal" />
);

Normal.story = {
  name: 'normal'
};

export const Empty = () => (
  <Avatar contributor={generateContributor({ noAvatar: true })} size="normal" />
);

Empty.story = {
  name: 'empty'
};

export const Small = () => (
  <Avatar contributor={generateContributor()} size="small" />
);

Small.story = {
  name: 'small'
};

export const SmallEmpty = () => (
  <Avatar contributor={generateContributor({ noAvatar: true })} size="small" />
);

SmallEmpty.story = {
  name: 'small empty'
};
