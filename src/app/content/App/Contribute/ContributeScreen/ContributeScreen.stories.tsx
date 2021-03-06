import React, { ReactElement } from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { StoryFn } from '@storybook/addons';
import Notification from 'components/organisms/Notification';
import { formStoreDecorator } from '../../../../../../.storybook/decorators';
import ContributeScreen from './ContributeScreen';

export default {
  title: 'Extension/Contribute'
};

export const _01Submit = () => <ContributeScreen />;

_01Submit.story = {
  name: '01-Submit'
};
_01Submit.decorators = [
  formStoreDecorator,
  (getStory: StoryFn<ReactElement>) => (
    <Router>
      <Notification title="poster une information ici">
        {getStory()}
      </Notification>
    </Router>
  )
];
