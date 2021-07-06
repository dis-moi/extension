import { connect } from 'react-redux';
import { change } from 'redux-form';
import { push } from 'connected-react-router';
import React, { ReactElement } from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { StoryFn } from '@storybook/addons';
import Notification from 'components/organisms/Notification';
import { generateContributor } from 'test/fakers/generateContributor';
import { ContentWrapperBackground } from 'components/atoms';
import { formStoreDecorator } from '../../../../../../.storybook/decorators';
import QuestionForm from './QuestionForm/QuestionForm';

export default {
  title: 'Extension/Question/Form',

  decorators: [
    formStoreDecorator,
    (getStory: StoryFn<ReactElement>) => (
      <Router>
        <Notification title="Demander une information ici">
          {getStory()}
        </Notification>
      </Router>
    )
  ]
};

const withConnect = connect(
  () => ({
    errors: [],
    contributors: [generateContributor(), generateContributor()]
  }),
  {
    onUrlChange: (url: string) => change('question', 'url', url),
    onSubmit: () => push('/question/preview')
  }
);

const ConnectedQuestionForm = withConnect(QuestionForm);

export const Normal = () => (
  <ContentWrapperBackground>
    <ConnectedQuestionForm />
  </ContentWrapperBackground>
);

Normal.story = {
  name: 'normal'
};

export const Error = () => (
  <ContentWrapperBackground>
    <ConnectedQuestionForm />
  </ContentWrapperBackground>
);

Error.story = {
  name: 'error'
};
