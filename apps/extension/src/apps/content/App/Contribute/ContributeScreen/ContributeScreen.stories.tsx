import React, { ReactElement } from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import Notification from 'src/components/organisms/Notification';
import ContributeScreen from './ContributeScreen';
import { formStoreDecorator } from '../../../../../../../../.storybook/decorators';
import { StoryFn } from '@storybook/addons';

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
