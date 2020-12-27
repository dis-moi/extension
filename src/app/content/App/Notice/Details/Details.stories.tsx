import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, date, number, boolean } from '@storybook/addon-knobs';
import Faker from 'faker';
import {
  defaultMessage,
  generateStatefulNotice,
  messageWithYoutubeVideo
} from 'test/fakers/generateNotice';
import { Details } from '.';
import { subMonths } from 'date-fns';
import Notification from 'components/organisms/Notification';
import { generateContributor } from 'test/fakers/generateContributor';

const defaultContributorName = Faker.name.findName();
const defaultDate = subMonths(new Date(), 1);
const longMessage = Faker.lorem.paragraph(12);
const commonProps = {
  like: action('like'),
  unlike: action('unlike'),
  dislike: action('dislike'),
  confirmDislike: action('confirmDislike'),
  undislike: action('undislike'),
  view: action('view'),
  outboundLinkClicked: action('outboundLinkClicked'),
  goBack: action('goBack'),
  onContributorClick: action('onContributorClick')
};

storiesOf('Extension/Notice/Details', module)
  .addDecorator(withKnobs)
  .addDecorator(getStory => (
    <Router>
      <Notification close={action('close')} hasNotices>
        {getStory()}
      </Notification>
    </Router>
  ))
  .add('default', () => (
    <Details
      {...commonProps}
      notice={generateStatefulNotice({
        contributor: generateContributor({
          name: text('contributor', defaultContributorName)
        }),
        message: `<p>${text('message', defaultMessage)}</p>`,
        created: new Date(date('created', defaultDate)),
        likes: number('likes', 42),
        dislikes: number('dislikes', 2),
        liked: boolean('liked', false),
        disliked: boolean('disliked', false)
      })}
    />
  ))
  .add('long message', () => (
    <Details
      {...commonProps}
      notice={generateStatefulNotice({
        contributor: generateContributor({
          name: text('contributor', defaultContributorName)
        }),
        message: `<p>${text('message', longMessage)}</p>`,
        created: new Date(date('created', defaultDate)),
        likes: number('likes', 42),
        dislikes: number('dislikes', 2),
        liked: boolean('liked', false),
        disliked: boolean('disliked', false)
      })}
    />
  ))
  .add('with youtube video', () => (
    <Details
      {...commonProps}
      notice={generateStatefulNotice({
        contributor: generateContributor({
          name: text('contributor', defaultContributorName)
        }),
        message: `<p>${text('message', messageWithYoutubeVideo)}</p>`,
        created: new Date(date('created', defaultDate)),
        likes: number('likes', 42),
        dislikes: number('dislikes', 2),
        liked: boolean('liked', false),
        disliked: boolean('disliked', false)
      })}
    />
  ));
