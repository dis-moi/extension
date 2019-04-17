import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Notice from './Notice';

const message = '<p>Description with a <a href="http://some.url">link</a></p>';

storiesOf('organisms/Notice', module)
  .addDecorator(getStory => <Router>{getStory()}</Router>)
  .add('Approved', () => (
    <Notice
      type="Approval"
      contributor="Jalil"
      id={123}
      message={message}
      dismiss={action('dismiss')}
      undismiss={action('undismiss')}
    />
  ))
  .add('Disapproved', () => (
    <Notice
      type="Disapproval"
      contributor="Jalil"
      id={123}
      message={message}
      dismiss={action('dismiss')}
      undismiss={action('undismiss')}
    />
  ))
  .add('Tip', () => (
    <Notice
      type="Tip"
      contributor="Jalil"
      id={123}
      message={message}
      dismiss={action('dismiss')}
      undismiss={action('undismiss')}
    />
  ))
  .add('Other', () => (
    <Notice
      type="Other"
      contributor="Jalil"
      id={123}
      message={message}
      dismiss={action('dismiss')}
      undismiss={action('undismiss')}
    />
  ))
  .add('No type', () => (
    <Notice
      contributor="Jalil"
      id={123}
      message={message}
      dismiss={action('dismiss')}
      undismiss={action('undismiss')}
    />
  ))
  .add('Undefined type', () => (
    <Notice
      type={undefined}
      contributor="Jalil"
      id={123}
      message={message}
      dismiss={action('dismiss')}
      undismiss={action('undismiss')}
    />
  ))
  .add('Dismissed', () => (
    <Notice
      contributor="Jalil"
      id={123}
      message={message}
      dismiss={action('dismiss')}
      undismiss={action('undismiss')}
      dismissed
    />
  ))
  .add('Long title', () => (
    <Notice
      contributor="Jalil"
      id={123}
      message={
        '<p>This is very long title for a notification with a <a href="http://some.url">link</a> that you may want to read some time in the future</p>'
      }
      dismiss={action('dismiss')}
      undismiss={action('undismiss')}
    />
  ))
  .add('Read', () => (
    <Notice
      type="Approval"
      contributor="Lutangar"
      id={123}
      message={message}
      dismiss={action('dismiss')}
      undismiss={action('undismiss')}
      read
    />
  ));
