import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';
import {
  defaultMessage,
  generateStatefulNotice
} from 'test/fakers/generateNotice';
import Notification from 'components/organisms/Notification';
import { ListScreen } from '.';

const firstMessage = defaultMessage;
const secondMessage = `De nombreux clients mécontents de Pixmania et ses vendeurs s'expriment sur les réseaux sociaux depuis 2016. Les plaintes continuent en 2017, 2018 et encore en 2019 si l'on se réfère au forum Que Choisir.`;
const commonProps = {
  close: action('close'),
  dismiss: action('dismiss'),
  confirmDismiss: action('confirmDismiss'),
  undismiss: action('undismiss'),
  onContributorClick: action('onContributorClick')
};

storiesOf('Extension/Notice/List', module)
  .addDecorator(withKnobs)
  .addDecorator(getStory => (
    <Router>
      <Notification close={action('close')} hasNotices>
        {getStory()}
      </Notification>
    </Router>
  ))
  .add('1 notice', () => (
    <ListScreen
      {...commonProps}
      notices={[
        generateStatefulNotice({
          dismissed: boolean('dismissed', false),
          message: `<p>${text('message', firstMessage)}</p>`
        })
      ]}
    />
  ))
  .add('2 notices', () => (
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
  ))
  .add('1 read', () => (
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
  ))
  .add('Deleted', () => (
    <ListScreen
      {...commonProps}
      notices={[
        generateStatefulNotice({
          dismissed: boolean('dismissed(1)', true, 'first'),
          message: `<p>${text('message(1)', firstMessage, 'first')}</p>`
        })
      ]}
    />
  ));
