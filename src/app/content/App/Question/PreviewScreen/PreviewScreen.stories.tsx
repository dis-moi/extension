import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import Notification from 'components/organisms/Notification';
import PreviewScreen from './PreviewScreen';
import { action } from '@storybook/addon-actions';
import { formStoreDecorator } from '../../../../../../.storybook/decorators';
import { WEBSITE_DOMAIN } from 'app/lmem';

storiesOf('Extension/Question/Preview', module)
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
      question={{
        message:
          "Bonjour @maarten-lmem j'ai entendu dire que cette extension navigateur était open-source, hors je n'ai pas trouvé le code source. Pourriez-vous m'indiquez ou puis-je le trouver?",
        url: `https://${WEBSITE_DOMAIN}/`,
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
  .add('long', () => (
    <PreviewScreen
      question={{
        message:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        url: `https://${WEBSITE_DOMAIN}/`,
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
      question={{
        message:
          "Bonjour @maarten-lmem j'ai entendu dire que cette l'extension https://www.bulles.fr/ était open-source, hors je n'ai pas trouvé le code source. Pourriez-vous m'indiquez ou puis-je le trouver?",
        url: `https://${WEBSITE_DOMAIN}/`,
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
