import React, { ReactElement } from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { StoryFn } from '@storybook/addons';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';
import { ListScreen } from '.';
import {
  defaultMessage,
  generateStatefulNotice
} from 'test/fakers/generateNotice';
import Notification from 'components/organisms/Notification';

const firstMessage = defaultMessage;
const secondMessage = `De nombreux clients mécontents de Pixmania et ses vendeurs s'expriment sur les réseaux sociaux depuis 2016. Les plaintes continuent en 2017, 2018 et encore en 2019 si l'on se réfère au forum Que Choisir.`;
const thirdMessage = 'yolo';
const commonProps = {
  close: action('close'),
  dismiss: action('dismiss'),
  confirmDismiss: action('confirmDismiss'),
  undismiss: action('undismiss'),
  onContributorClick: action('onContributorClick')
};

export default {
  title: 'Extension/Notice/List',

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

export const _1Notice = () => (
  <ListScreen
    {...commonProps}
    notices={[
      generateStatefulNotice({
        dismissed: boolean('dismissed', false),
        message: `<p>${text('message', firstMessage)}</p>`
      })
    ]}
  />
);

_1Notice.story = {
  name: '1 notice'
};

export const _2Notices = () => (
  <ListScreen
    {...commonProps}
    notices={[
      generateStatefulNotice({
        dismissed: boolean('dismissed(1)', false, 'first'),
        message: `<p>${text('message(1)', firstMessage, 'first')}</p>`
      }),
      generateStatefulNotice({
        dismissed: boolean('dismissed(2)', false, 'second'),
        message: `<p>${text('message(2)', secondMessage, 'second')}</p>`
      })
    ]}
  />
);

export const _3Notices = () => (
  <ListScreen
    {...commonProps}
    notices={[
      generateStatefulNotice({
        dismissed: boolean('dismissed(1)', false, 'first'),
        message: `<p>${text('message(1)', firstMessage, 'first')}</p>`
      }),
      generateStatefulNotice({
        dismissed: boolean('dismissed(2)', false, 'second'),
        message: `<p>${text('message(2)', secondMessage, 'second')}</p>`
      }),
      generateStatefulNotice({
        dismissed: boolean('dismissed(3)', false, 'third'),
        message: `<p>${text('message(3)', thirdMessage, 'third')}</p>`
      })
    ]}
  />
);

_2Notices.story = {
  name: '2 notices'
};

export const _1Read = () => (
  <ListScreen
    {...commonProps}
    notices={[
      generateStatefulNotice({
        dismissed: boolean('dismissed(1)', false, 'first'),
        message: `<p>${text('message(1)', firstMessage, 'first')}</p>`
      }),
      generateStatefulNotice({
        read: true,
        dismissed: boolean('dismissed(2)', false, 'second'),
        message: `<p>${text('message(2)', secondMessage, 'second')}</p>`
      })
    ]}
  />
);

_1Read.story = {
  name: '1 read'
};

export const Deleted = () => (
  <ListScreen
    {...commonProps}
    notices={[
      generateStatefulNotice({
        dismissed: boolean('dismissed(1)', true, 'first'),
        message: `<p>${text('message(1)', firstMessage, 'first')}</p>`
      })
    ]}
  />
);
