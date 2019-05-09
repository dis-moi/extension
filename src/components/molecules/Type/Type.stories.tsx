import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import Intention from './IntentionIcon';

storiesOf('molecules/Type', module)
  .addDecorator(getStory => <Router>{getStory()}</Router>)
  .add('approval', () => <Intention intention="approval" />)
  .add('disapproval', () => <Intention intention="disapproval" />)
  .add('alternative', () => <Intention intention="alternative" />)
  .add('tip', () => <Intention intention="tip" />)
  .add('other', () => <Intention intention="other" />)
  .add('undefined / unknown ', () => <Intention />);
