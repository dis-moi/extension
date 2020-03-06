import React from 'react';
import { storiesOf } from '@storybook/react';
import { MemoryRouter as Router } from 'react-router-dom';
import Notification from 'components/organisms/Notification';
import FormScreen from './';
import { formStoreDecorator } from '../../../../../../.storybook/decorators';

storiesOf('screens/Question/Form', module)
  .addDecorator(formStoreDecorator)
  .addDecorator(getStory => (
    <Router>
      <Notification title="Demander une information ici">
        {getStory()}
      </Notification>
    </Router>
  ))
  .add('normal', () => <FormScreen />)
  .add('error', () => <FormScreen />);
