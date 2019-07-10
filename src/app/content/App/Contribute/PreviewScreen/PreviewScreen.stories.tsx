import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import Notification from 'components/organisms/Notification';
import PreviewScreen from './PreviewScreen';
import { action } from '@storybook/addon-actions';

storiesOf('screens/Contribute/Preview', module)
  .addDecorator(getStory => (
    <Router>
      <Notification title="Prévisualisation" hasNotices>
        {getStory()}
      </Notification>
    </Router>
  ))
  .add('normal', () => (
    <PreviewScreen
      contribution={{
        message:
          "Je tiens à dire que la canicule, c'est une bonne chose pour les vieux.",
        name: 'Johan Dufour',
        url: 'https://weather.com',
        contributor: {
          email: 'johan.dufour@gmail.com',
          name: 'Johan Dufour'
        },
        intention: 'approval',
        created: new Date()
      }}
      modify={action('modify')}
      publish={action('publish')}
    />
  ));
