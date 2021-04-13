import React, { ReactElement } from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import Faker from 'faker';
import { StoryFn } from '@storybook/addons';
import {
  defaultMessage,
  generateStatefulNotice
} from 'test/fakers/generateNotice';
import { generateContributor } from 'test/fakers/generateContributor';
import Notice from './Notice';

const defaultContributorName = Faker.name.findName();
const longMessage =
  'This is very long title for a notification with a link that you may want to read some time in the future';

const commonProps = {
  dismiss: action('dismiss'),
  confirmDismiss: action('confirmDismiss'),
  undismiss: action('undismiss'),
  onContributorClick: action('onContributorClick')
};

export default {
  title: 'Components/Organisms/Notice',
  decorators: [
    withKnobs,
    (getStory: StoryFn<ReactElement>) => <Router>{getStory()}</Router>
  ]
};

export const Default = () => (
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
);

export const Dismissed = () => (
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
);

export const Read = () => (
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
);

export const LongTitle = () => (
  <Notice
    {...commonProps}
    notice={generateStatefulNotice({
      contributor: generateContributor({
        name: text('contributor', defaultContributorName)
      }),
      message: `<p>${text('message', longMessage)}</p>`
    })}
  />
);

LongTitle.story = {
  name: 'Long title'
};
