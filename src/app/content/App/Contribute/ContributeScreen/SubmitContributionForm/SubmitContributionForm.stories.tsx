import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import SubmitContribution from './SubmitContributionForm';
import { formStoreDecorator } from '../../../../../../../.storybook/decorators';

storiesOf('Components/Molecules', module)
  .addDecorator(formStoreDecorator)
  .addDecorator(getStory => <Router>{getStory()}</Router>)
  .add('SubmitContribution', () => (
    <SubmitContribution
      onUrlChange={action('onUrlChange')}
      onSubmit={action('onSubmit')}
      errors={[]}
    />
  ));
