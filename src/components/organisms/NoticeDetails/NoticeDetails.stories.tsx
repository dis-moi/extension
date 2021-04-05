import React, { ReactElement } from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { action } from '@storybook/addon-actions';
import { StoryFn } from '@storybook/addons';
import NoticeDetails from './NoticeDetails';
import { subMonths } from 'date-fns';
import Faker from 'faker';
import {
  generateStatefulNotice,
  messageWithYoutubeVideo
} from 'test/fakers/generateNotice';
import { boolean, date, number, text } from '@storybook/addon-knobs';
import { generateContributor } from 'test/fakers/generateContributor';

const defaultMessage = Faker.lorem.paragraph(3);
const longMessage = Faker.lorem.paragraph(10);
const defaultDate = subMonths(new Date(), 1);
const commonProps = {
  like: action('like'),
  unlike: action('unlike'),
  dislike: action('dislike'),
  confirmDislike: action('confirmDislike'),
  undislike: action('undislike'),
  view: action('view'),
  goBack: action('goBack'),
  onContributorClick: action('onContributorClick')
};

export default {
  title: 'Components/Organisms/NoticeDetails',
  decorators: [
    (getStory: StoryFn<ReactElement>) => <Router>{getStory()}</Router>
  ]
};

export const Default = () => (
  <NoticeDetails
    {...commonProps}
    notice={generateStatefulNotice({
      message: `<p>${text('message', defaultMessage)}</p>`,
      created: new Date(date('created', defaultDate)),
      likes: number('likes', 42),
      dislikes: number('dislikes', 2),
      liked: boolean('liked', false),
      disliked: boolean('disliked', false)
    })}
  />
);

export const LongMessage = () => (
  <NoticeDetails
    {...commonProps}
    notice={generateStatefulNotice({
      message: `<p>${text('message', longMessage)}</p>`
    })}
  />
);

LongMessage.story = {
  name: 'Long message'
};

export const Dismissed = () => (
  <NoticeDetails
    {...commonProps}
    notice={generateStatefulNotice({ dismissed: true })}
  />
);

export const Liked = () => (
  <NoticeDetails
    {...commonProps}
    notice={generateStatefulNotice({
      liked: true,
      likes: number('likes', 1)
    })}
  />
);

export const Disliked = () => (
  <NoticeDetails
    {...commonProps}
    notice={generateStatefulNotice({ disliked: true })}
  />
);

export const Relayed = () => (
  <NoticeDetails
    {...commonProps}
    notice={generateStatefulNotice({ disliked: true })}
    relayer={generateContributor()}
  />
);

export const YoutubeVideo = () => (
  <NoticeDetails
    {...commonProps}
    notice={generateStatefulNotice({
      message: messageWithYoutubeVideo
    })}
  />
);

YoutubeVideo.story = {
  name: 'Youtube video'
};
