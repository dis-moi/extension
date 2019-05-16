import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import NoticeDetails from './NoticeDetails';
import { EnhancedNotice } from '../../../app/lmem/notice';
import { subMonths, subWeeks } from 'date-fns';

const baseNotice: EnhancedNotice = {
  id: 123,
  intention: 'approval',
  created: subMonths(new Date(), 1),
  modified: subWeeks(new Date(), 1),
  message: `
<p>Un message qui décrit <a href="http://www.lmem.net">quelque chose</a> et donc ça prend beaucoup de mots. </p>
<p>Il peut aussi y avoir plusieurs paragraphes, <a href="http://www.lmem.net">avec encore des liens</a></p>
`,
  ratings: { likes: 42, dislikes: 2 },
  contributor: { id: 1, name: 'Jalil' },
  visibility: 'public',
  source: { label: 'LMEM', url: 'http://www.lmem.net' },
  status: {
    liked: false,
    dismissed: false,
    disliked: false,
    read: false
  }
};

const message = storiesOf('organisms/NoticeDetails', module)
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
        status: { ...baseNotice.status, dismissed: true }
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
        status: { ...baseNotice.status, disliked: true }
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
