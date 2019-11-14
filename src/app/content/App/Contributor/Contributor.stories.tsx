import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Notification from 'components/organisms/Notification';
import Contributor from './Contributor';
import { MemoryRouter as Router } from 'react-router';
import { generateContributor } from 'test/fakers/generateContributor';

storiesOf('screens/Contributor', module)
  .addDecorator(getStory => (
    <Router>
      <Notification close={action('close')}>{getStory()}</Notification>
    </Router>
  ))
  .add('normal', () => <Contributor contributor={generateContributor()} />);
