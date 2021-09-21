import React, { ReactElement } from 'react';
import { StoryFn } from '@storybook/addons';
import Header from '../../molecules/Header/Header';
import Footer from '../../organisms/Footer/Footer';
import HomePageOriginal, { HomePageOriginalProps } from './HomePageOriginal';
import HomePageAnimatedWithTextV2 from './HomePageAnimatedWithTextV2';

export default {
  title: 'Website/Pages/HomePageTests',
  decorators: [
    (getStory: StoryFn<ReactElement>) => (
      <div style={{ margin: '-1rem', backgroundColor: 'white' }}>
        <Header />
        <>{getStory()}</>
        <Footer />
      </div>
    )
  ]
};

export const _HomePageOriginal = (args: HomePageOriginalProps) => (
  <HomePageOriginal {...args} />
);

export const _HomePageAnimatedWithTextV2 = (args: HomePageOriginalProps) => (
  <HomePageAnimatedWithTextV2 {...args} />
);

/* export const _HomePageStaticV1 = (args: HomePageStaticV1Props) => (
  <HomePageStaticV1 {...args} />
);
export const _HomePageAnimatedLeftV1 = (args: HomePageAnimatedLeftV1Props) => (
  <HomePageAnimatedLeftV1 {...args} />
); */
