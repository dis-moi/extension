import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import {
  withKnobs,
  text,
  select,
  date,
  number,
  boolean
} from '@storybook/addon-knobs';
import Faker from 'faker';
import {
  defaultMessage,
  defaultSourceUrl,
  generateStatefulNotice
} from '../../../../../../test/fakers/generateNotice';
import { Details } from '.';
import { intentions } from '../../../../lmem/intention';
import { subMonths } from 'date-fns';
import Notification from '../../../../../components/organisms/Notification';

const defaultContributorName = Faker.name.findName();
const defaultDate = subMonths(new Date(), 1);

storiesOf('screens/Notice/Details', module)
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
      notice={generateStatefulNotice({
        contributor: text('contributor', defaultContributorName),
        intention: select('intention', intentions, 'approval'),
        message: `<p>${text('message', defaultMessage)}</p>`,
        sourceUrl: text('source', defaultSourceUrl),
        created: date('created', defaultDate),
        likes: number('likes', 42),
        dislikes: number('dislikes', 2),
        liked: boolean('liked', false),
        disliked: boolean('disliked', false)
      })}
      like={action('like')}
      unlike={action('unlike')}
      dislike={action('dislike')}
      undislike={action('undislike')}
      view={action('view')}
      followSource={action('followSource')}
    />
  ));
