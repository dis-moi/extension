import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import Subscribe from '../Subscribe';

storiesOf('screens/Onboarding/Subscribe', module)
  .addDecorator(getStory => <Router>{getStory()}</Router>)
  .add('Lmem --> Bulles', () => <Subscribe updatedFromLmem={true} />)
  .add('Bulles', () => <Subscribe updatedFromLmem={false} />);
