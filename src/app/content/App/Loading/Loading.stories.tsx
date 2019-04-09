import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Loading } from '.';

storiesOf('screens/Loading', module)
  .addDecorator(getStory => <Router>{getStory()}</Router>)
  .add('normal', () => <Loading close={action('close')} />);
