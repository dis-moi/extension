import React, { ReactElement } from 'react';
import { StoryFn } from '@storybook/addons';
import Layout from '../../../../app/website/src/components/Layout';
import HomePage, { HomePageProps } from './HomePage';

export default {
  title: 'Website/Pages/HomePage',
  decorators: [
    (getStory: StoryFn<ReactElement>) => (
      <div style={{ margin: '-1rem', backgroundColor: 'white' }}>
        <Layout
          pageContext={{ langKey: 'fr', slug: '/fr/slug', title: 'Home' }}
          path={'/'}
        >
          <>{getStory()}</>
        </Layout>
      </div>
    )
  ]
};

export const _HomePage = (args: HomePageProps) => <HomePage {...args} />;
