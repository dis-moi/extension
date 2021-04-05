import React, { ReactElement } from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { StoryFn } from '@storybook/addons';
import { action } from '@storybook/addon-actions';
import Notification from 'components/organisms/Notification';
import ConfirmationScreen from './ConfirmationScreen';
import { formStoreDecorator } from '../../../../../../.storybook/decorators';

export default {
  title: 'Extension/Question',

  decorators: [
    formStoreDecorator,
    (getStory: StoryFn<ReactElement>) => (
      <Router>
        <Notification>{getStory()}</Notification>
      </Router>
    )
  ]
};

export const Confirmation = () => (
  <ConfirmationScreen goBack={action('goBack')} />
);
