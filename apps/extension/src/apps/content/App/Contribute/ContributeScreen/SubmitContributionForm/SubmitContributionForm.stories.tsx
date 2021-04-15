import React, { ReactElement } from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { action } from '@storybook/addon-actions';
import SubmitContribution from './SubmitContributionForm';
import { formStoreDecorator } from '../../../../../../../../../.storybook/decorators';
import { StoryFn } from '@storybook/addons';

export default {
  title: 'Components/Molecules',
  decorators: [
    formStoreDecorator,
    (getStory: StoryFn<ReactElement>) => <Router>{getStory()}</Router>
  ]
};

export const _SubmitContribution = () => (
  <SubmitContribution
    onUrlChange={action('onUrlChange')}
    onSubmit={action('onSubmit')}
    errors={[]}
  />
);

_SubmitContribution.story = {
  name: 'SubmitContribution'
};
