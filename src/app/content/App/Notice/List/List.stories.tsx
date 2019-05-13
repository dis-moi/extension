import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, object } from '@storybook/addon-knobs/react';
import { List } from '.';
import { EnhancedNotice } from '../../../../lmem/notice';

const notice: EnhancedNotice = {
  id: 123,
  title: 'title is going to be removed',
  description: '<p>Description with a <a href="http://some.url">link</a></p>',
  contributor: { name: 'John Doe', image: 'image', organization: 'org' },
  criteria: [{ label: 'label', slug: 'slug' }],
  resource: {
    author: 'Jack Daniels',
    editor: { id: 42, label: 'LMEM', url: 'url' },
    label: 'label',
    url: 'url'
  },
  alternatives: [
    {
      label: 'some alternative',
      url_to_redirect: 'url'
    }
  ],
  dismissed: false,
  disliked: false,
  liked: false,
  dislikes: 0,
  likes: 0,
  valid: true,
  visibility: 'public' as 'public'
};

storiesOf('screens/Notice/List', module)
  .addDecorator(withKnobs)
  .addDecorator(getStory => <Router>{getStory()}</Router>)
  .add('1 notice', () => {
    const notices = object('Notices', [notice]);

    return (
      <List
        close={action('close')}
        dismiss={action('dismiss')}
        undismiss={action('undismiss')}
        notices={notices}
      />
    );
  })
  .add('2 notices', () => {
    const notices = object('Notices', [notice, notice]);

    return (
      <List
        close={action('close')}
        dismiss={action('dismiss')}
        undismiss={action('undismiss')}
        notices={notices}
      />
    );
  })
  .add('1 read', () => {
    const notices = object('Notices', [notice, { ...notice, read: true }]);

    return (
      <List
        close={action('close')}
        dismiss={action('dismiss')}
        undismiss={action('undismiss')}
        notices={notices}
      />
    );
  })
  .add('empty', () => {
    const notices = object('Notices', []);

    return (
      <List
        close={action('close')}
        dismiss={action('dismiss')}
        undismiss={action('undismiss')}
        notices={notices}
      />
    );
  })
  .add('2 lines excerpt', () => {
    const notices = object('Notices', [
      {
        ...notice,
        description:
          'dazd zazaddd dddddd ddddd dddd dddddd ddd ddddd dddddddd dd'
      }
    ]);

    return (
      <List
        close={action('close')}
        dismiss={action('dismiss')}
        undismiss={action('undismiss')}
        notices={notices}
      />
    );
  });
