import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import Notification from 'components/organisms/Notification';
import PreviewScreen from './PreviewScreen';
import { action } from '@storybook/addon-actions';
import { formStoreDecorator } from '../../../../../../.storybook/decorators';

storiesOf('screens/Contribute/Preview', module)
  .addDecorator(formStoreDecorator)
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
        url: 'https://weather.com',
        contributor: {
          email: 'johan.dufour@gmail.com',
          name: 'Johan Dufour'
        },
        created: new Date()
      }}
      errors={[]}
      modify={action('modify')}
      publish={action('publish')}
    />
  ))
  .add('with a link', () => (
    <PreviewScreen
      contribution={{
        message:
          "Tombe, tombe, tombe la https://fr.wikipedia.org/wiki/Pluie Tout le monde est à l'abri Y'a que mon petit frère qu'est sous la gouttière pêchant des poissons pour toute la maison...",
        url: 'https://weather.com',
        contributor: {
          email: 'johan.dufour@gmail.com',
          name: 'Johan Dufour'
        },
        created: new Date()
      }}
      errors={[]}
      modify={action('modify')}
      publish={action('publish')}
    />
  ));
