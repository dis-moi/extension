import React, { ReactElement } from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { action } from '@storybook/addon-actions';
import Notification from 'src/components/organisms/Notification';
import SubmittedScreen from './SubmittedScreen';
import { formStoreDecorator } from '../../../../../../.storybook/decorators';
import { StoryFn } from '@storybook/addons';

export default {
  title: 'Extension/Contribute/Submitted',
  component: SubmittedScreen
};

export const _03Submitted = () => <SubmittedScreen goBack={action('goBack')} />;

_03Submitted.story = {
  name: '03-Submitted'
};
_03Submitted.decorators = [
  formStoreDecorator,
  (getStory: StoryFn<ReactElement>) => (
    <Router>
      <Notification>{getStory()}</Notification>
    </Router>
  )
];
