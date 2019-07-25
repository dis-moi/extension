import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import NoticeDetails from './NoticeDetails';
import { subMonths, subWeeks } from 'date-fns';
import Faker from 'faker';
import {
  defaultSourceUrl,
  generateStatefulNotice
} from '../../../../test/fakers/generateNotice';
import { boolean, date, number, select, text } from '@storybook/addon-knobs';
import { intentions } from '../../../app/lmem/intention';

const defaultContributorName = Faker.name.findName();
const defaultMessage = Faker.lorem.paragraph(3);
const defaultDate = subMonths(new Date(), 1);
const commonProps = {
  like: action('like'),
  unlike: action('unlike'),
  dislike: action('dislike'),
  confirmDislike: action('confirmDislike'),
  undislike: action('undislike'),
  view: action('view')
};

storiesOf('organisms/NoticeDetails', module)
  .addDecorator(getStory => <Router>{getStory()}</Router>)
  .add('Approval', () => (
    <NoticeDetails
      {...commonProps}
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
    />
  ))
  .add('Dismissed', () => (
    <NoticeDetails
      {...commonProps}
      notice={generateStatefulNotice({ dismissed: true })}
    />
  ))
  .add('Disliked', () => (
    <NoticeDetails
      {...commonProps}
      notice={generateStatefulNotice({ disliked: true })}
    />
  ))
  .add('No source', () => (
    <NoticeDetails
      {...commonProps}
      notice={generateStatefulNotice({ withSource: false })}
    />
  ));
