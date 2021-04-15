import React, { ReactElement } from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { action } from '@storybook/addon-actions';
import SubmitContribution from './QuestionForm';
import { formStoreDecorator } from '../../../../../../../../../.storybook/decorators';
import { StoryFn } from '@storybook/addons';

export default {
  title: 'Components/Molecules/QuestionForm',
  decorators: [
    formStoreDecorator,
    (getStory: StoryFn<ReactElement>) => <Router>{getStory()}</Router>
  ]
};

export const Normal = () => (
  <SubmitContribution
    onUrlChange={action('onUrlChange')}
    onSubmit={action('onSubmit')}
    errors={[]}
    error={''}
    contributors={[]}
  />
);

Normal.story = {
  name: 'normal'
};

export const MultipleErrors = () => (
  <SubmitContribution
    onUrlChange={action('onUrlChange')}
    onSubmit={action('onSubmit')}
    errors={['Votre email est invalide', 'Le nom est requis.']}
    error={''}
    contributors={[]}
  />
);

MultipleErrors.story = {
  name: 'multiple errors'
};

export const GlobalErrors = () => (
  <SubmitContribution
    onUrlChange={action('onUrlChange')}
    onSubmit={action('onSubmit')}
    errors={[]}
    error={'Attention! Tous les champs sont obligatoires.'}
    contributors={[]}
  />
);

GlobalErrors.story = {
  name: 'global errors'
};
