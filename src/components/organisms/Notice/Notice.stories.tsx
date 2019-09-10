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
} from 'test/fakers/generateNotice';
import Faker from 'faker';
import { intentions } from '../../../app/lmem/intention';
import Title from './Title';

const defaultContributorName = Faker.name.findName();
const longMessage =
  'This is very long title for a notification with a link that you may want to read some time in the future';

const commonProps = {
  dismiss: action('dismiss'),
  confirmDismiss: action('confirmDismiss'),
  undismiss: action('undismiss')
};

storiesOf('organisms/Notice', module)
  .addDecorator(withKnobs)
  .addDecorator(getStory => <Router>{getStory()}</Router>)
  .add('Default', () => (
    <Notice
      {...commonProps}
      notice={generateStatefulNotice({
        dismissed: boolean('dismissed', false),
        intention: 'approval',
        contributor: text('contributor', defaultContributorName),
        message: `<p>${text('message', defaultMessage)}</p>`
      })}
    />
  ))
  .add('Dismissed', () => (
    <Notice
      {...commonProps}
      notice={generateStatefulNotice({
        dismissed: true,
        intention: select('intention', intentions, 'approval'),
        contributor: text('contributor', defaultContributorName),
        message: `<p>${text('message', defaultMessage)}</p>`
      })}
    />
  ))
  .add('Read', () => (
    <Notice
      {...commonProps}
      notice={generateStatefulNotice({
        read: true,
        intention: select('intention', intentions, 'approval'),
        contributor: text('contributor', defaultContributorName),
        message: `<p>${text('message', defaultMessage)}</p>`
      })}
    />
  ))
  .add('Long title', () => (
    <Notice
      {...commonProps}
      notice={generateStatefulNotice({
        intention: select('intention', intentions, 'approval'),
        contributor: text('contributor', defaultContributorName),
        message: `<p>${text('message', longMessage)}</p>`
      })}
      truncateTitleAt={number(
        'truncateTitleAt',
        Title.defaultProps.numberOfCharacters
      )}
    />
  ));
