import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import NoticeDetails from './NoticeDetails';

storiesOf('organisms/NoticeDetails', module)
  .addDecorator(getStory => (
    <Router>
      {getStory()}
    </Router>
  ))
  .add('Approval', () => (
    <NoticeDetails
      type="Approval"
      contributor="Jalil"
      id="123"
      message="Un message qui décrit quelque chose et donc ça prend beaucoup de mots"
      date="12/12/2042"
      source="http://www.lmem.net"
      likes={42}
      dislikes={2}
      dismiss={action('dismiss')}
    />
  ))
  .add('Dismissed', () => (
    <NoticeDetails
      type="Approval"
      dismissed
      contributor="Jalil"
      id="123"
      message="Un message qui décrit quelque chose et donc ça prend beaucoup de mots"
      date="12/12/2042"
      source="http://www.lmem.net"
      likes={42}
      dislikes={2}
      dismiss={action('dismiss')}
    />
  ))
  .add('Disliked', () => (
    <NoticeDetails
      type="Approval"
      disliked
      contributor="Jalil"
      id="123"
      message="Un message qui décrit quelque chose et donc ça prend beaucoup de mots"
      date="12/12/2042"
      source="http://www.lmem.net"
      likes={42}
      dislikes={2}
      dismiss={action('dismiss')}
    />
  ));
