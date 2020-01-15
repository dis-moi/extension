import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import SubmitContribution from './QuestionForm';
import { formStoreDecorator } from '../../../../../../../.storybook/config';

storiesOf('forms/QuestionForm', module)
  .addDecorator(formStoreDecorator)
  .addDecorator(getStory => <Router>{getStory()}</Router>)
  .add('normal', () => (
    <SubmitContribution
      onUrlChange={action('onUrlChange')}
      onSubmit={action('onSubmit')}
      errors={[]}
      error={''}
    />
  ))
  .add('multiple errors', () => (
    <SubmitContribution
      onUrlChange={action('onUrlChange')}
      onSubmit={action('onSubmit')}
      errors={['Votre email est invalide', 'Le nom est requis.']}
      error={''}
    />
  ))
  .add('global errors', () => (
    <SubmitContribution
      onUrlChange={action('onUrlChange')}
      onSubmit={action('onSubmit')}
      errors={[]}
      error={'Attention! Tous les champs sont obligatoires.'}
    />
  ));
