import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import Faker from 'faker';
import NoticePreview from './NoticePreview';
import {
  defaultMessage,
  messageWithYoutubeVideo
} from '../../../test/fakers/generateNotice';

export default {
  title: 'Components/Organisms/NoticePreview'
};

export const Normal = () => (
  <Router>
    <NoticePreview
      contribution={{
        url: Faker.internet.url(),
        created: new Date(),
        contributor: {
          name: Faker.name.findName(),
          email: Faker.internet.email()
        },
        message: defaultMessage
      }}
    />
  </Router>
);

Normal.story = {
  name: 'normal'
};

export const WithLinks = () => (
  <Router>
    <NoticePreview
      contribution={{
        url: Faker.internet.url(),
        created: new Date(),
        contributor: {
          name: Faker.name.findName(),
          email: Faker.internet.email()
        },
        message: `${defaultMessage} https://github.com/dis-moi/extension`
      }}
    />
  </Router>
);

WithLinks.story = {
  name: 'with links'
};

export const WithYoutubeVideo = () => (
  <Router>
    <NoticePreview
      contribution={{
        url: Faker.internet.url(),
        created: new Date(),
        contributor: {
          name: Faker.name.findName(),
          email: Faker.internet.email()
        },
        message: messageWithYoutubeVideo
      }}
    />
  </Router>
);

WithYoutubeVideo.story = {
  name: 'with youtube video'
};
