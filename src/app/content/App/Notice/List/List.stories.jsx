import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { List } from '.';

const notices = [
  {
    id: '123',
    description: '<p>Description with a <a href="http://some.url">link</a></p>',
    contributor: { name: 'John Doe' },
    criteria: [{ label: 'label', slug: 'slug' }],
    isApproved: true,
    isDismissed: false,
    resource: {
      author: 'Jack Daniels',
      editor: 'LMEM',
      label: 'label',
      url: 'url',
    },
    alternatives: [{
      label: 'some alternative',
      url_to_redirect: 'url'
    }]
  }
];

storiesOf('screens/Notice/List', module)
  .addDecorator(getStory => (
    <Router>
      {getStory()}
    </Router>
  ))
  .add('with 1 notification', () => (
    <List close={action('close')} dismiss={action('dismiss')} undismiss={action('undismiss')} notices={notices} />
  ))
  .add('empty list', () => (
    <List close={action('close')} dismiss={action('dismiss')} undismiss={action('undismiss')} notices={[]} />
  ));
