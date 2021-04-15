import React, { ReactElement } from 'react';
import i18n from 'i18next';
import { MemoryRouter as Router } from 'react-router-dom';
import { action } from '@storybook/addon-actions';
import { StoryFn } from '@storybook/addons';
import Notification from 'src/components/organisms/Notification';
import ServiceMessage from './ServiceMessage';
import { LinkType } from 'libs/lmem/ServiceMessage';

export default {
  title: 'Extension/ServiceMessage',

  decorators: [
    (getStory: StoryFn<ReactElement>) => (
      <Router>
        <Notification close={action('close')}>{getStory()}</Notification>
      </Router>
    )
  ]
};

export const WithAnAction = () => (
  <ServiceMessage
    messages={["I'm a service message!"]}
    action={{
      label: "I'm an action",
      url: i18n.t('path.profiles.contributors'),
      type: LinkType.Options
    }}
    openOnboarding={() => action('openOnboarding')}
  />
);

WithAnAction.story = {
  name: 'With an action'
};

export const WithoutAnAction = () => (
  <ServiceMessage
    messages={["I'm a service message!"]}
    openOnboarding={() => action('openOnboarding')}
  />
);

WithoutAnAction.story = {
  name: 'Without an action'
};

export const WithManyParagraphs = () => (
  <ServiceMessage
    messages={["Here's the first paragraph!", "And here's a second one."]}
    openOnboarding={() => action('openOnboarding')}
  />
);

WithManyParagraphs.story = {
  name: 'With many paragraphs'
};
