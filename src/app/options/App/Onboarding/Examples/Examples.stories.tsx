import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Examples from './Examples';
import Wrapper from '../../ScreenWrapper';
import { optionsStoreDecorator } from '../../../../../../.storybook/decorators';

storiesOf('Onboarding', module)
  .addDecorator(optionsStoreDecorator)
  .addDecorator(getStory => (
    <Router>
      <Wrapper>{getStory()}</Wrapper>
    </Router>
  ))
  .add('Examples', () => <Examples next={action('next')} />);
