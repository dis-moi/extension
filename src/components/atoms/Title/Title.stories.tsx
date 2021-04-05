import React from 'react';
import Title from './Title';
import { text, withKnobs } from '@storybook/addon-knobs';

export default {
  title: 'Components/Atoms/Title',
  decorators: [withKnobs]
};

export const Normal = () => <Title>{text('title', 'Some Title')}</Title>;

Normal.story = {
  name: 'normal'
};
