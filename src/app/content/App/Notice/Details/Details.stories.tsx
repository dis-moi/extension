import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { Details } from '.';
import { action } from '@storybook/addon-actions';

storiesOf('screens/Notice/Details', module)
  .addDecorator(getStory => <Router>{getStory()}</Router>)
  .add('default', () => (
    <Details
      notice={{
        id: 42,
        title: 'Title will be removed',
        description: "This is the notice's message. It can be short or long.",
        visibility: 'public',
        alternatives: [],
        contributor: { name: 'John Doe', organization: 'ORG', image: 'image' },
        resource: {
          author: 'author',
          label: 'resource',
          url: 'http://w',
          editor: { id: 1, label: 'editor', url: 'http://x' }
        },
        criteria: [],
        liked: false,
        likes: 12,
        disliked: false,
        dislikes: 1,
        dismissed: false,
        valid: true
      }}
      like={action('like')}
      unlike={action('unlike')}
      dislike={action('dislike')}
      undislike={action('undislike')}
    />
  ));
