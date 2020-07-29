import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import Notice from './Notice';
import {
  defaultMessage,
  generateStatefulNotice
} from 'test/fakers/generateNotice';
import Faker from 'faker';
import { generateContributor } from 'test/fakers/generateContributor';

const defaultContributorName = Faker.name.findName();
const longMessage =
  'This is very long title for a notification with a link that you may want to read some time in the future';

const commonProps = {
  dismiss: action('dismiss'),
  confirmDismiss: action('confirmDismiss'),
  undismiss: action('undismiss'),
  onContributorClick: action('onContributorClick')
};

storiesOf('Components/Organisms/Notice', module)
  .addDecorator(withKnobs)
  .addDecorator(getStory => <Router>{getStory()}</Router>)
  .add('Default', () => (
    <Notice
      {...commonProps}
      notice={generateStatefulNotice({
        dismissed: boolean('dismissed', false),
        contributor: generateContributor({
          name: text('contributor', defaultContributorName)
        }),
        message: `<p>${text('message', defaultMessage)}</p>`
      })}
    />
  ))
  .add('Dismissed', () => (
    <Notice
      {...commonProps}
      notice={generateStatefulNotice({
        dismissed: true,
        contributor: generateContributor({
          name: text('contributor', defaultContributorName)
        }),
        message: `<p>${text('message', defaultMessage)}</p>`
      })}
    />
  ))
  .add('Read', () => (
    <Notice
      {...commonProps}
      notice={generateStatefulNotice({
        read: true,
        contributor: generateContributor({
          name: text('contributor', defaultContributorName)
        }),
        message: `<p>${text('message', defaultMessage)}</p>`
      })}
    />
  ))
  .add('Long title', () => (
    <Notice
      {...commonProps}
      notice={generateStatefulNotice({
        contributor: generateContributor({
          name: text('contributor', defaultContributorName)
        }),
        message: `<p>${text('message', longMessage)}</p>`
      })}
    />
  ));
