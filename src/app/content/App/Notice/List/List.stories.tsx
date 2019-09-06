import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, text, select } from '@storybook/addon-knobs/react';
import {
  defaultMessage,
  generateStatefulNotice
} from 'test/fakers/generateNotice';
import Faker from 'faker';
import { intentions } from '../../../../lmem/intention';
import Notification from 'components/organisms/Notification';
import { ListScreen } from '.';

const firstContributorName = Faker.name.findName();
const firstMessage = defaultMessage;
const secondContributorName = Faker.name.findName();
const secondMessage = `De nombreux clients mécontents de Pixmania et ses vendeurs s'expriment sur les réseaux sociaux depuis 2016. Les plaintes continuent en 2017, 2018 et encore en 2019 si l'on se réfère au forum Que Choisir.`;
const commonProps = {
  close: action('close'),
  dismiss: action('dismiss'),
  confirmDismiss: action('confirmDismiss'),
  undismiss: action('undismiss')
};

storiesOf('screens/Notice/List', module)
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
          intention: select('intention', intentions, 'approval'),
          contributor: text('contributor', firstContributorName),
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
          intention: select('intention(1)', intentions, 'approval', 'first'),
          contributor: text('contributor(1)', firstContributorName, 'first'),
          message: `<p>${text('message(1)', firstMessage, 'first')}</p>`
        }),
        generateStatefulNotice({
          dismissed: boolean('dismissed(2)', false, 'second'),
          intention: select(
            'intention(2)',
            intentions,
            'disapproval',
            'second'
          ),
          contributor: text('contributor(2)', secondContributorName, 'second'),
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
          intention: select('intention(1)', intentions, 'approval', 'first'),
          contributor: text('contributor(1)', firstContributorName, 'first'),
          message: `<p>${text('message(1)', firstMessage, 'first')}</p>`
        }),
        generateStatefulNotice({
          read: true,
          dismissed: boolean('dismissed(2)', false, 'second'),
          intention: select(
            'intention(2)',
            intentions,
            'disapproval',
            'second'
          ),
          contributor: text('contributor(2)', secondContributorName, 'second'),
          message: `<p>${text('message(2)', secondMessage, 'second')}</p>`
        })
      ]}
    />
  ))
  .add('empty', () => <ListScreen {...commonProps} notices={[]} />);
