import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import SubmitContribution from './SubmitContributionForm';
import { formStoreDecorator } from '../../../../../../../.storybook/config';

storiesOf('forms/SubmitContribution', module)
  .addDecorator(formStoreDecorator)
  .addDecorator(getStory => <Router>{getStory()}</Router>)
  .add('normal', () => (
    <SubmitContribution
      onUrlChange={action('onUrlChange')}
      onSubmit={action('onSubmit')}
      errors={[]}
    />
  ));
