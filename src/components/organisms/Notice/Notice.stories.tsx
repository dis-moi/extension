import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import {
  withKnobs,
  text,
  boolean,
  select,
  number
} from '@storybook/addon-knobs';
import Notice from './Notice';
import {
  defaultMessage,
  generateStatefulNotice
} from '../../../../test/fakers/generateNotice';
import Faker from 'faker';
import { intentions } from '../../../app/lmem/intention';
import Title from './Title';

const defaultContributorName = Faker.name.findName();
const longMessage =
  'This is very long title for a notification with a link that you may want to read some time in the future';

storiesOf('organisms/Notice', module)
  .addDecorator(withKnobs)
  .addDecorator(getStory => <Router>{getStory()}</Router>)
  .add('Approved', () => (
    <Notice
      notice={generateStatefulNotice({
        dismissed: boolean('dismissed', false),
        intention: 'approval',
        contributor: text('contributor', defaultContributorName),
        message: `<p>${text('message', defaultMessage)}</p>`
      })}
      dismiss={action('dismiss')}
      undismiss={action('undismiss')}
    />
  ))
  .add('Disapproved', () => (
    <Notice
      notice={generateStatefulNotice({
        dismissed: boolean('dismissed', false),
        intention: 'disapproval',
        contributor: text('contributor', defaultContributorName),
        message: `<p>${text('message', defaultMessage)}</p>`
      })}
      dismiss={action('dismiss')}
      undismiss={action('undismiss')}
    />
  ))
  .add('Alternative', () => (
    <Notice
      notice={generateStatefulNotice({
        intention: 'alternative',
        dismissed: boolean('dismissed', false),
        contributor: text('contributor', defaultContributorName),
        message: `<p>${text('message', defaultMessage)}</p>`
      })}
      dismiss={action('dismiss')}
      undismiss={action('undismiss')}
    />
  ))
  .add('Information', () => (
    <Notice
      notice={generateStatefulNotice({
        intention: 'information',
        dismissed: boolean('dismissed', false),
        contributor: text('contributor', defaultContributorName),
        message: `<p>${text('message', defaultMessage)}</p>`
      })}
      dismiss={action('dismiss')}
      undismiss={action('undismiss')}
    />
  ))
  .add('Other', () => (
    <Notice
      notice={generateStatefulNotice({
        intention: 'other',
        dismissed: boolean('dismissed', false),
        contributor: text('contributor', defaultContributorName),
        message: `<p>${text('message', defaultMessage)}</p>`
      })}
      dismiss={action('dismiss')}
      undismiss={action('undismiss')}
    />
  ))
  .add('Dismissed', () => (
    <Notice
      notice={generateStatefulNotice({
        dismissed: true,
        intention: select('intention', intentions, 'approval'),
        contributor: text('contributor', defaultContributorName),
        message: `<p>${text('message', defaultMessage)}</p>`
      })}
      dismiss={action('dismiss')}
      undismiss={action('undismiss')}
    />
  ))
  .add('Read', () => (
    <Notice
      notice={generateStatefulNotice({
        read: true,
        intention: select('intention', intentions, 'approval'),
        contributor: text('contributor', defaultContributorName),
        message: `<p>${text('message', defaultMessage)}</p>`
      })}
      dismiss={action('dismiss')}
      undismiss={action('undismiss')}
    />
  ))
  .add('Long title', () => (
    <Notice
      notice={generateStatefulNotice({
        intention: select('intention', intentions, 'approval'),
        contributor: text('contributor', defaultContributorName),
        message: `<p>${text('message', longMessage)}</p>`
      })}
      dismiss={action('dismiss')}
      undismiss={action('undismiss')}
      truncateTitleAt={number(
        'truncateTitleAt',
        Title.defaultProps.numberOfCharacters
      )}
    />
  ));
