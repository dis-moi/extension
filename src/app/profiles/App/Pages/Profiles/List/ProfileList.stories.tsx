import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import ProfileList from './ProfileList';
import { generateStatefulContributor } from 'test/fakers/generateContributor';
import { MemoryRouter as Router } from 'react-router-dom';

const CATEGORIES = {
  CONSO: 'Conso',
  CULTURE: 'Culture & Société',
  MILITANT: 'Militant',
  DIVERS: 'Divers'
};

storiesOf('Profile/ProfileList', module)
  .addDecorator(getStory => <Router>{getStory()}</Router>)
  .add('normal', () => (
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
      goToContributor={action('goToContributor')}
    />
  ))
  .add('loading', () => (
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
      goToContributor={action('goToContributor')}
    />
  ));
