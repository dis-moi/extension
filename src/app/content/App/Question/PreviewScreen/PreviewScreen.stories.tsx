import React, { ReactElement } from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { action } from '@storybook/addon-actions';
import { StoryFn } from '@storybook/addons';
import Notification from 'components/organisms/Notification';
import { WEBSITE_DOMAIN } from 'libs/domain';
import { formStoreDecorator } from '../../../../../../.storybook/decorators';
import PreviewScreen from './PreviewScreen';

export default {
  title: 'Extension/Question/Preview',

  decorators: [
    formStoreDecorator,
    (getStory: StoryFn<ReactElement>) => (
      <Router>
        <Notification title="Prévisualisation" hasNotices>
          {getStory()}
        </Notification>
      </Router>
    )
  ]
};

export const Normal = () => (
  <PreviewScreen
    question={{
      message:
        "Bonjour @maarten-lmem j'ai entendu dire que cette extension navigateur était open-source, hors je n'ai pas trouvé le code source. Pourriez-vous m'indiquez ou puis-je le trouver?",
      url: `https://${WEBSITE_DOMAIN}/`,
      contributor: {
        email: 'johan.dufour@gmail.com',
        name: 'Johan Dufour'
      },
      created: new Date(),
      question: true
    }}
    errors={[]}
    modify={action('modify')}
    publish={action('publish')}
  />
);

Normal.story = {
  name: 'normal'
};

export const Long = () => (
  <PreviewScreen
    question={{
      message:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      url: `https://${WEBSITE_DOMAIN}/`,
      contributor: {
        email: 'johan.dufour@gmail.com',
        name: 'Johan Dufour'
      },
      created: new Date(),
      question: true
    }}
    errors={[]}
    modify={action('modify')}
    publish={action('publish')}
  />
);

Long.story = {
  name: 'long'
};

export const WithALink = () => (
  <PreviewScreen
    question={{
      message:
        "Bonjour @maarten-lmem j'ai entendu dire que l'extension https://www.dismoi.io/ était open-source, hors je n'ai pas trouvé le code source. Pourriez-vous m'indiquez ou puis-je le trouver?",
      url: `https://${WEBSITE_DOMAIN}/`,
      contributor: {
        email: 'johan.dufour@gmail.com',
        name: 'Johan Dufour'
      },
      created: new Date(),
      question: true
    }}
    errors={[]}
    modify={action('modify')}
    publish={action('publish')}
  />
);

WithALink.story = {
  name: 'with a link'
};
