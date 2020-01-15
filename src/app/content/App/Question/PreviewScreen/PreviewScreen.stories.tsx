import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import Notification from 'components/organisms/Notification';
import PreviewScreen from './PreviewScreen';
import { action } from '@storybook/addon-actions';
import { formStoreDecorator } from '../../../../../../.storybook/config';

storiesOf('screens/Question/Preview', module)
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
          "Bonjour @maarten-lmem j'ai entendu dire que cette extension navigateur était open-source, hors je n'ai pas trouvé le code source. Pourriez-vous m'indiquez ou puis-je le trouver?",
        url: 'https://www.bulles.fr/',
        contributor: {
          email: 'johan.dufour@gmail.com',
          name: 'Johan Dufour'
        },
        created: new Date(),
        intention: 'other'
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
          "Bonjour @maarten-lmem j'ai entendu dire que cette l'extension https://www.bulles.fr/ était open-source, hors je n'ai pas trouvé le code source. Pourriez-vous m'indiquez ou puis-je le trouver?",
        url: 'https://www.bulles.fr/',
        contributor: {
          email: 'johan.dufour@gmail.com',
          name: 'Johan Dufour'
        },
        created: new Date(),
        intention: 'other'
      }}
      errors={[]}
      modify={action('modify')}
      publish={action('publish')}
    />
  ));
