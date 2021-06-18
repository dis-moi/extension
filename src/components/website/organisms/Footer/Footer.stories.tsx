import React, { ReactElement } from 'react';
import { StoryFn } from '@storybook/addons';
import FooterContent from './Footer';

export default {
  title: 'Website/Molecules/Footer',
  decorators: [
    (getStory: StoryFn<ReactElement>) => (
      <div style={{ margin: '-1rem' }}>
        <>{getStory()}</>
      </div>
    )
  ]
};

export const Footer = () => <FooterContent />;
