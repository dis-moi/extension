import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Notification from 'components/organisms/Notification';
import SubmittedScreen from './SubmittedScreen';
import { formStoreDecorator } from '../../../../../../.storybook/decorators';

storiesOf('Extension/Contribute', module)
  .addDecorator(formStoreDecorator)
  .addDecorator(getStory => (
    <Router>
      <Notification>{getStory()}</Notification>
    </Router>
  ))
  .add('03-Submitted', () => <SubmittedScreen goBack={action('goBack')} />);
