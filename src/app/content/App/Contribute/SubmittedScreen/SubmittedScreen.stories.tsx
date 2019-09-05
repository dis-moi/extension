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
  .add('normal', () => (
    <SubmittedScreen
      goBack={action('goBack')}
      contribution={{
        message:
          "Je tiens à dire que la canicule, c'est une bonne chose pour les vieux.",
        url: 'https://weather.com',
        contributor: {
          email: 'johan.dufour@gmail.com',
          name: 'Johan Dufour'
        },
        intention: 'approval',
        created: new Date()
      }}
    />
  ));
