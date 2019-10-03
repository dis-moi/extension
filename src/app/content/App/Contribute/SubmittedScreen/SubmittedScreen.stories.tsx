import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Notification from 'components/organisms/Notification';
import SubmittedScreen from './SubmittedScreen';

storiesOf('screens/Contribute/Submitted', module)
  .addDecorator(getStory => (
    <Router>
      <Notification>{getStory()}</Notification>
    </Router>
  ))
  .add('normal', () => <SubmittedScreen goBack={action('goBack')} />);
