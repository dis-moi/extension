import React, { ReactElement } from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { action } from '@storybook/addon-actions';
import { withKnobs, text, date, number, boolean } from '@storybook/addon-knobs';
import Faker from 'faker';
import {
  defaultMessage,
  generateStatefulNotice,
  messageWithYoutubeVideo
} from '../../../../../../../../test/fakers/generateNotice';
import { Details } from './index';
import { subMonths } from 'date-fns';
import Notification from 'src/components/organisms/Notification';
import { generateContributor } from '../../../../../../../../test/fakers/generateContributor';
import { StoryFn } from '@storybook/addons';

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

export default {
  title: 'Extension/Notice/Details',

  decorators: [
    withKnobs,
    (getStory: StoryFn<ReactElement>) => (
      <Router>
        <Notification close={action('close')} hasNotices>
          {getStory()}
        </Notification>
      </Router>
    )
  ]
};

export const Default = () => (
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
);

Default.story = {
  name: 'default'
};

export const LongMessage = () => (
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
);

LongMessage.story = {
  name: 'long message'
};

export const WithYoutubeVideo = () => (
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
);

WithYoutubeVideo.story = {
  name: 'with youtube video'
};
