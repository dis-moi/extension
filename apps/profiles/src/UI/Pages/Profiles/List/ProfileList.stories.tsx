import React, { ReactElement } from 'react';
import { action } from '@storybook/addon-actions';
import ProfileList from './ProfileList';
import { generateStatefulContributor } from '../../../../../../../test/fakers/generateContributor';
import { MemoryRouter as Router } from 'react-router-dom';
import { StoryFn } from '@storybook/addons';

const CATEGORIES = {
  CONSO: 'Conso',
  CULTURE: 'Culture & Société',
  MILITANT: 'Militant',
  DIVERS: 'Divers'
};

export default {
  title: 'Profile/ProfileList',
  decorators: [
    (getStory: StoryFn<ReactElement>) => <Router>{getStory()}</Router>
  ]
};

export const Normal = () => (
  <ProfileList
    unsubscribe={action('unsubscribe')}
    subscribe={action('subscribe')}
    contributors={[
      generateStatefulContributor(),
      generateStatefulContributor(),
      generateStatefulContributor(),
      generateStatefulContributor(),
      generateStatefulContributor(),
      generateStatefulContributor(),
      generateStatefulContributor(),
      generateStatefulContributor(),
      generateStatefulContributor()
    ]}
    loading={false}
    connected={false}
    addToBrowser={action('addToBrowser')}
    categories={CATEGORIES}
    categoriesLoading={false}
  />
);

Normal.story = {
  name: 'normal'
};

export const Loading = () => (
  <ProfileList
    unsubscribe={action('unsubscribe')}
    subscribe={action('subscribe')}
    contributors={[
      generateStatefulContributor(),
      generateStatefulContributor(),
      generateStatefulContributor(),
      generateStatefulContributor(),
      generateStatefulContributor(),
      generateStatefulContributor(),
      generateStatefulContributor(),
      generateStatefulContributor(),
      generateStatefulContributor()
    ]}
    loading
    connected={false}
    addToBrowser={action('addToBrowser')}
    categories={CATEGORIES}
    categoriesLoading={false}
  />
);

Loading.story = {
  name: 'loading'
};
