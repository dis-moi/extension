import React, { ReactElement } from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { action } from '@storybook/addon-actions';
import { StoryFn } from '@storybook/addons';
import Notification from 'components/organisms/Notification';
import { formStoreDecorator } from '../../../../../../.storybook/decorators';
import PreviewScreen from './PreviewScreen';

export default {
  title: 'Extension/Contribute/02-Preview',

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
);

Normal.story = {
  name: 'normal'
};

export const WithALink = () => (
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
);

WithALink.story = {
  name: 'with a link'
};
