import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Notification from 'components/organisms/Notification';
import ConfirmationScreen from './ConfirmationScreen';
import { formStoreDecorator } from '../../../../../../.storybook/decorators';

storiesOf('Extension/Question', module)
  .addDecorator(formStoreDecorator)
  .addDecorator(getStory => (
    <Router>
      <Notification>{getStory()}</Notification>
    </Router>
  ))
  .add('Confirmation', () => <ConfirmationScreen goBack={action('goBack')} />);
