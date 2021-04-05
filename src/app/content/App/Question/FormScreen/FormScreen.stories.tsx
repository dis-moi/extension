import React, { ReactElement } from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { StoryFn } from '@storybook/addons';
import Notification from 'components/organisms/Notification';
import FormScreen from './';
import { formStoreDecorator } from '../../../../../../.storybook/decorators';

export default {
  title: 'Extension/Question/Form',

  decorators: [
    formStoreDecorator,
    (getStory: StoryFn<ReactElement>) => (
      <Router>
        <Notification title="Demander une information ici">
          {getStory()}
        </Notification>
      </Router>
    )
  ]
};

export const Normal = () => <FormScreen />;

Normal.story = {
  name: 'normal'
};

export const Error = () => <FormScreen />;

Error.story = {
  name: 'error'
};
