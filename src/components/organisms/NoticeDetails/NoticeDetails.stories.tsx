import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import NoticeDetails from './NoticeDetails';
import { subMonths } from 'date-fns';
import Faker from 'faker';
import { generateStatefulNotice } from 'test/fakers/generateNotice';
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

storiesOf('Components/Organisms/NoticeDetails', module)
  .addDecorator(getStory => <Router>{getStory()}</Router>)
  .add('Default', () => (
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
  ))
  .add('Long message', () => (
    <NoticeDetails
      {...commonProps}
      notice={generateStatefulNotice({
        message: `<p>${text('message', longMessage)}</p>`
      })}
    />
  ))
  .add('Dismissed', () => (
    <NoticeDetails
      {...commonProps}
      notice={generateStatefulNotice({ dismissed: true })}
    />
  ))
  .add('Liked', () => (
    <NoticeDetails
      {...commonProps}
      notice={generateStatefulNotice({
        liked: true,
        likes: number('likes', 1)
      })}
    />
  ))
  .add('Disliked', () => (
    <NoticeDetails
      {...commonProps}
      notice={generateStatefulNotice({ disliked: true })}
    />
  ))
  .add('Relayed', () => (
    <NoticeDetails
      {...commonProps}
      notice={generateStatefulNotice({ disliked: true })}
      relayer={generateContributor()}
    />
  ));
