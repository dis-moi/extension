import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import Intention from './IntentionIcon';

storiesOf('Components/Atoms/Intentions', module)
  .addDecorator(getStory => <Router>{getStory()}</Router>)
  .add('approval (active)', () => <Intention active intention="approval" />)
  .add('approval (inactive)', () => <Intention intention="approval" />)
  .add('disapproval (active)', () => (
    <Intention active intention="disapproval" />
  ))
  .add('disapproval (inactive)', () => <Intention intention="disapproval" />)
  .add('alternative (active)', () => (
    <Intention active intention="alternative" />
  ))
  .add('alternative (inactive)', () => <Intention intention="alternative" />)
  .add('information (active)', () => (
    <Intention active intention="information" />
  ))
  .add('information (inactive)', () => <Intention intention="information" />)
  .add('other (active)', () => <Intention active intention="other" />)
  .add('other (inactive)', () => <Intention intention="other" />)
  .add('undefined / unknown ', () => <Intention />);
