import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import NoticeDetails from './NoticeDetails';

const message = `
<p> Un message qui décrit <a href="http://www.lmem.net">quelque chose</a> et donc ça prend beaucoup de mots. </p>
<p>Il peut aussi y avoir plusieurs paragraphes, <a href="http://www.lmem.net">avec encore des liens</a></p>
`;

storiesOf('organisms/NoticeDetails', module)
  .addDecorator(getStory => <Router>{getStory()}</Router>)
  .add('Approval', () => (
    <NoticeDetails
      type="Approval"
      contributor="Jalil"
      id={123}
      message={message}
      date="12/12/2042"
      source="http://www.lmem.net"
      like={action('like')}
      unlike={action('unlike')}
      dislike={action('dislike')}
      undislike={action('undislike')}
      view={action('view')}
    />
  ))
  .add('Dismissed', () => (
    <NoticeDetails
      type="Approval"
      dismissed
      contributor="Jalil"
      id={123}
      message={message}
      date="12/12/2042"
      source="http://www.lmem.net"
      like={action('like')}
      unlike={action('unlike')}
      dislike={action('dislike')}
      undislike={action('undislike')}
      view={action('view')}
    />
  ))
  .add('Disliked', () => (
    <NoticeDetails
      type="Approval"
      disliked
      contributor="Jalil"
      id={123}
      message={message}
      date="12/12/2042"
      source="http://www.lmem.net"
      like={action('like')}
      unlike={action('unlike')}
      dislike={action('dislike')}
      undislike={action('undislike')}
      view={action('view')}
    />
  ))
  .add('No source', () => (
    <NoticeDetails
      type="Approval"
      contributor="Lutangar"
      id={123}
      message={message}
      date="12/12/2042"
      like={action('like')}
      unlike={action('unlike')}
      dislike={action('dislike')}
      undislike={action('undislike')}
    />
  ));
