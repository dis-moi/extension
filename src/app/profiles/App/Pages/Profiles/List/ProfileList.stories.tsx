import React, { ReactElement } from 'react';
import { action } from '@storybook/addon-actions';
import { MemoryRouter as Router } from 'react-router-dom';
import { StoryFn } from '@storybook/addons';
import { generateStatefulContributor } from 'test/fakers/generateContributor';
import ProfileList from './ProfileList';

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
    setContextPopin={() => null}
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
    setContextPopin={() => null}
  />
);

Loading.story = {
  name: 'loading'
};
