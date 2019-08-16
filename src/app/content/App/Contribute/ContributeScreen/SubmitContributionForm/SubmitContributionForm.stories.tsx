import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import SubmitContribution from './SubmitContributionForm';

storiesOf('forms/SubmitContribution', module)
  .addDecorator(getStory => <Router>{getStory()}</Router>)
  .add('normal', () => (
    <SubmitContribution onSubmit={action('onSubmit')} errors={[]} />
  ));
