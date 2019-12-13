import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Examples from './Examples';
import Wrapper from '../../ScreenWrapper';
import { optionsStoreDecorator } from '../../../../../../.storybook/config';

storiesOf('screens/Onboarding/Examples', module)
  .addDecorator(optionsStoreDecorator)
  .addDecorator(getStory => (
    <Router>
      <Wrapper>{getStory()}</Wrapper>
    </Router>
  ))
  .add('default', () => <Examples next={action('next')} />);
