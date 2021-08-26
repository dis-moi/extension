import React, { ReactElement } from 'react';
import { StoryFn } from '@storybook/addons';
import Header from '../../molecules/Header/Header';
import { listLinkFooter, listLinkHeader } from '../dummies/listLinks';
import Footer from '../../organisms/Footer/Footer';
import HomePage, { HomePageProps } from './HomePage';

export default {
  title: 'Website/Pages/HomePage',
  decorators: [
    (getStory: StoryFn<ReactElement>) => (
      <div style={{ margin: '-1rem', backgroundColor: 'white' }}>
        <Header links={listLinkHeader} />
        <>{getStory()}</>
        <Footer links={listLinkFooter} />
      </div>
    )
  ]
};

export const _HomePage = (args: HomePageProps) => <HomePage {...args} />;
