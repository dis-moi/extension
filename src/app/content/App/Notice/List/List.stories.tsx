import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, object } from '@storybook/addon-knobs/react';
import { List } from '.';
import { StatefulNotice } from '../../../../lmem/notice';
import { subMonths, subWeeks } from 'date-fns';

const notice: StatefulNotice = {
  id: 123,
  intention: 'disapproval',
  created: subMonths(new Date(), 1),
  modified: subWeeks(new Date(), 1),
  message: '<p>Description with a <a href="http://some.url">link</a></p>',
  contributor: { id: 1, name: 'John Doe', image: 'image' },
  source: {
    label: 'LMEM',
    url: 'http://www.lmem.net'
  },
  visibility: 'public',
  ratings: { dislikes: 0, likes: 0 },
  state: {
    dismissed: false,
    disliked: false,
    liked: false,
    read: false
  }
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
