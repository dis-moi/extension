import { withKnobs, text } from '@storybook/addon-knobs';
import React from 'react';
import ContentTitle from '.';

export default {
  title: 'Components/Atoms/ContentTitle',
  decorators: [withKnobs]
};

export const Normal = () => (
  <ContentTitle>{text('title', 'Title')}</ContentTitle>
);

Normal.story = {
  name: 'normal'
};
