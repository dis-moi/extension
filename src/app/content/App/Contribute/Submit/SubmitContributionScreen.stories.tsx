import React from 'react';
import { storiesOf } from '@storybook/react';
import { MemoryRouter as Router } from 'react-router-dom';
import SubmitContributionScreen from './SubmitContributionScreen';
import Notification from 'components/organisms/Notification';

storiesOf('screens/Contribute/Submit', module)
  .addDecorator(getStory => (
    <Router>
      <Notification title="créer une bulle ici">{getStory()}</Notification>
    </Router>
  ))
  .add('normal', () => <SubmitContributionScreen />);
