import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Notification from 'components/organisms/Notification';
import ServiceMessage from './ServiceMessage';
import { LinkType } from 'app/lmem/ServiceMessage';

storiesOf('Extension/ServiceMessage', module)
  .addDecorator(getStory => (
    <Router>
      <Notification close={action('close')}>{getStory()}</Notification>
    </Router>
  ))
  .add('With an action', () => (
    <ServiceMessage
      messages={["I'm a service message!"]}
      action={{
        label: "I'm an action",
        url: '/informateurs',
        type: LinkType.Options
      }}
      openOnboarding={() => action('openOnboarding')}
    />
  ))
  .add('Without an action', () => (
    <ServiceMessage
      messages={["I'm a service message!"]}
      openOnboarding={() => action('openOnboarding')}
    />
  ))
  .add('With many paragraphs', () => (
    <ServiceMessage
      messages={["Here's the first paragraph!", "And here's a second one."]}
      openOnboarding={() => action('openOnboarding')}
    />
  ));
