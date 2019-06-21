import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import NoticeDetails from './NoticeDetails';
import { subMonths } from 'date-fns';
import Faker from 'faker';
import {
  defaultSourceUrl,
  generateStatefulNotice
} from '../../../../test/fakers/generateNotice';
import { boolean, date, number, text } from '@storybook/addon-knobs';

const defaultContributorName = Faker.name.findName();
const defaultMessage = Faker.lorem.paragraph(3);
const defaultDate = subMonths(new Date(), 1);

const defaultActions = {
  like: action('like'),
  unlike: action('unlike'),
  dislike: action('dislike'),
  undislike: action('undislike'),
  view: action('view'),
  onEdit: action('edit'),
  onPublish: action('publish')
};

storiesOf('organisms/NoticeDetails', module)
  .addDecorator(getStory => <Router>{getStory()}</Router>)
  .add('Approval', () => (
    <NoticeDetails
      notice={generateStatefulNotice({
        contributor: text('contributor', defaultContributorName),
        intention: 'approval',
        message: `<p>${text('message', defaultMessage)}</p>`,
        sourceUrl: text('source', defaultSourceUrl),
        created: date('created', defaultDate),
        likes: number('likes', 42),
        dislikes: number('dislikes', 2),
        liked: boolean('liked', false),
        disliked: boolean('disliked', false)
      })}
      {...defaultActions}
    />
  ))
  .add('Dismissed', () => (
    <NoticeDetails
      notice={generateStatefulNotice({ dismissed: true })}
      {...defaultActions}
    />
  ))
  .add('Disliked', () => (
    <NoticeDetails
      notice={generateStatefulNotice({ disliked: true })}
      {...defaultActions}
    />
  ))
  .add('No source', () => (
    <NoticeDetails
      notice={generateStatefulNotice({ withSource: false })}
      {...defaultActions}
    />
  ))
  .add('Preview', () => (
    <NoticeDetails
      notice={generateStatefulNotice({ withSource: false })}
      preview
      {...defaultActions}
    />
  ));
