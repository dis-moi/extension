import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Notice from './Notice';

storiesOf('organisms/Notice', module)
  .addDecorator(getStory => (
    <Router>
      {getStory()}
    </Router>
  ))
  .add('Approval', () => (
    <Notice
      type="Approval"
      contributor="Jalil"
      id="123"
      message="message"
      dismiss={action('dismiss')}
      undismiss={action('undismiss')}
      dismissed={false}
    />
  ))
  .add('Disapproval', () => (
    <Notice
      type="Disapproval"
      contributor="Jalil"
      id="123"
      message="message"
      dismiss={action('dismiss')}
      undismiss={action('undismiss')}
      dismissed={false}
    />
  ))
  .add('Tip', () => (
    <Notice
      type="Tip"
      contributor="Jalil"
      id="123"
      message="message"
      dismiss={action('dismiss')}
      undismiss={action('undismiss')}
      dismissed={false}
    />
  ))
  .add('Other', () => (
    <Notice
      type="Other"
      contributor="Jalil"
      id="123"
      message="message"
      dismiss={action('dismiss')}
      undismiss={action('undismiss')}
      dismissed={false}
    />
  ))
  .add('No type', () => (
    <Notice
      contributor="Jalil"
      id="123"
      message="message"
      dismiss={action('dismiss')}
      undismiss={action('undismiss')}
      dismissed={false}
    />
  ))
  .add('Undefined type', () => (
    <Notice
      type={undefined}
      contributor="Jalil"
      id="123"
      message="message"
      dismiss={action('dismiss')}
      undismiss={action('undismiss')}
      dismissed={false}
    />
  ))
  .add('Unknown type', () => (
    <Notice
      type="some inexistant type"
      contributor="Jalil"
      id="123"
      message="message"
      dismiss={action('dismiss')}
      undismiss={action('undismiss')}
      dismissed={false}
    />
  ))
  .add('dismissed', () => (
    <Notice
      contributor="Jalil"
      id="123"
      message="message"
      dismiss={action('dismiss')}
      undismiss={action('undismiss')}
      dismissed
    />
  ));
