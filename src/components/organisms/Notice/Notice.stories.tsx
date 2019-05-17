import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Notice from './Notice';
import { StatefulNotice } from '../../../app/lmem/notice';
import { subWeeks, subMonths } from 'date-fns';

const baseNotice: StatefulNotice = {
  id: 123,
  intention: 'approval',
  created: subMonths(new Date(), 1),
  modified: subWeeks(new Date(), 1),
  message: '<p>Description with a <a href="http://some.url">link</a></p>',
  ratings: { likes: 42, dislikes: 2 },
  contributor: { id: 1, name: 'Jalil' },
  visibility: 'public',
  state: {
    liked: false,
    dismissed: false,
    disliked: false,
    read: false
  }
};

storiesOf('organisms/Notice', module)
  .addDecorator(getStory => <Router>{getStory()}</Router>)
  .add('Approved', () => (
    <Notice
      notice={baseNotice}
      dismiss={action('dismiss')}
      undismiss={action('undismiss')}
    />
  ))
  .add('Disapproved', () => (
    <Notice
      notice={{ ...baseNotice, intention: 'disapproval' }}
      dismiss={action('dismiss')}
      undismiss={action('undismiss')}
    />
  ))
  .add('Alternative', () => (
    <Notice
      notice={{ ...baseNotice, intention: 'alternative' }}
      dismiss={action('dismiss')}
      undismiss={action('undismiss')}
    />
  ))
  .add('Information', () => (
    <Notice
      notice={{ ...baseNotice, intention: 'information' }}
      dismiss={action('dismiss')}
      undismiss={action('undismiss')}
    />
  ))
  .add('Other', () => (
    <Notice
      notice={{ ...baseNotice, intention: 'other' }}
      dismiss={action('dismiss')}
      undismiss={action('undismiss')}
    />
  ))
  .add('Dismissed', () => (
    <Notice
      notice={{
        ...baseNotice,
        state: { ...baseNotice.state, dismissed: true }
      }}
      dismiss={action('dismiss')}
      undismiss={action('undismiss')}
    />
  ))
  .add('Read', () => (
    <Notice
      notice={{
        ...baseNotice,
        state: { ...baseNotice.state, read: true }
      }}
      dismiss={action('dismiss')}
      undismiss={action('undismiss')}
    />
  ))
  .add('Long title', () => (
    <Notice
      notice={{
        ...baseNotice,
        message:
          '<p>This is very long title for a notification with a <a href="http://some.url">link</a> that you may want to read some time in the future</p>'
      }}
      dismiss={action('dismiss')}
      undismiss={action('undismiss')}
    />
  ));
