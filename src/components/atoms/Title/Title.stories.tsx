import React from 'react';
import { text, withKnobs } from '@storybook/addon-knobs';
import Title from './Title';

export default {
  title: 'Components/Atoms/Title',
  decorators: [withKnobs]
};

export const Normal = () => <Title>{text('title', 'Some Title')}</Title>;

Normal.story = {
  name: 'normal'
};
