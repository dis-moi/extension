import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import Intention from './IntentionIcon';

storiesOf('molecules/Type', module)
  .addDecorator(getStory => <Router>{getStory()}</Router>)
  .add('approval (active)', () => <Intention active intention="approval" />)
  .add('approval (inactive)', () => <Intention intention="approval" />)
  .add('disapproval', () => <Intention intention="disapproval" />)
  .add('alternative', () => <Intention intention="alternative" />)
  .add('information', () => <Intention intention="information" />)
  .add('other', () => <Intention intention="other" />)
  .add('undefined / unknown ', () => <Intention />);
