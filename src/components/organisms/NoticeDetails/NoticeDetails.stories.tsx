import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import NoticeDetails from './NoticeDetails';
import { StatefulNotice } from '../../../app/lmem/notice';
import { subMonths, subWeeks } from 'date-fns';

const baseNotice: StatefulNotice = {
  id: 123,
  intention: 'approval',
  created: subMonths(new Date(), 1),
  modified: subWeeks(new Date(), 1),
  message: `
<p>L’économie est (vraiment) un sport de combat : “La boule puante de MM. Cahuc et Zylberberg contre le “négationnisme” des économistes critiques le confirme : le combat idéologique tombe parfois dans le caniveau. Depuis vingt ans pourtant, s’est construit en France une contre-expertise économique crédible qui veut fournir aux dominés des outils pour penser (et résister à) la pseudo” construit en France une contre-expertise</p>
`,
  ratings: { likes: 42, dislikes: 2 },
  contributor: { id: 1, name: 'Jalil' },
  visibility: 'public',
  source: {
    label: 'LMEM',
    url:
      'https://blogs.mediapart.fr/thomas-coutrot/blog/040916/leconomie-est-vraiment-un-sport-de-combat'
  },
  state: {
    liked: false,
    dismissed: false,
    disliked: false,
    read: false
  }
};

storiesOf('organisms/NoticeDetails', module)
  .addDecorator(getStory => <Router>{getStory()}</Router>)
  .add('Approval', () => (
    <NoticeDetails
      notice={baseNotice}
      like={action('like')}
      unlike={action('unlike')}
      dislike={action('dislike')}
      undislike={action('undislike')}
      view={action('view')}
    />
  ))
  .add('Dismissed', () => (
    <NoticeDetails
      notice={{
        ...baseNotice,
        state: { ...baseNotice.state, dismissed: true }
      }}
      like={action('like')}
      unlike={action('unlike')}
      dislike={action('dislike')}
      undislike={action('undislike')}
      view={action('view')}
    />
  ))
  .add('Disliked', () => (
    <NoticeDetails
      notice={{
        ...baseNotice,
        state: { ...baseNotice.state, disliked: true }
      }}
      like={action('like')}
      unlike={action('unlike')}
      dislike={action('dislike')}
      undislike={action('undislike')}
      view={action('view')}
    />
  ))
  .add('No source', () => (
    <NoticeDetails
      notice={{
        ...baseNotice,
        source: undefined
      }}
      like={action('like')}
      unlike={action('unlike')}
      dislike={action('dislike')}
      undislike={action('undislike')}
    />
  ));
