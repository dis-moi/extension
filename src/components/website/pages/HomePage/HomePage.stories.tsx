import React, { ReactElement } from 'react';
import { StoryFn } from '@storybook/addons';
import Header from '../../molecules/Header/Header';
import HomePage, { HomePageProps } from './HomePage';

export default {
  title: 'Website/Pages/HomePage',
  decorators: [
    (getStory: StoryFn<ReactElement>) => (
      <div style={{ margin: '-1rem' }}>
        <Header />
        <>{getStory()}</>
      </div>
    )
  ]
};

export const _HomePage = (args: HomePageProps) => <HomePage {...args} />;
