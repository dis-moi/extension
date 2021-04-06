import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import Faker from 'faker';
import NoticePreview from './NoticePreview';
import {
  defaultMessage,
  messageWithYoutubeVideo
} from 'test/fakers/generateNotice';

storiesOf('Components/Organisms/NoticePreview', module)
  .add('normal', () => (
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
  ))
  .add('with links', () => (
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
  ))
  .add('with youtube video', () => (
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
  ))
  .add('with youtube video', () => (
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
  ));
