import React, { ReactElement } from 'react';
import { StoryFn } from '@storybook/addons';
import Header from '../../molecules/Header/Header';
import Footer from '../../organisms/Footer/Footer';
import AboutUsPage, { AboutUsPageProps } from './AboutUsPage';

export default {
  title: 'Website/Pages/AboutUsPage',
  decorators: [
    (getStory: StoryFn<ReactElement>) => (
      <div style={{ margin: '-1rem', backgroundColor: 'white' }}>
        <Header scrolled={true} />
        <>{getStory()}</>
        <Footer />
      </div>
    )
  ]
};

export const _AboutUsPage = (args: AboutUsPageProps) => (
  <AboutUsPage {...args} />
);
