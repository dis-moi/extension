import { reduxForm } from 'redux-form';
import validate from '@dismoi/domain/contribution/validateForm';
import { Question } from '@dismoi/domain/notice';
import { QuestionFormOwnProps } from './QuestionForm';

export const form = 'question';

export default reduxForm<Question, QuestionFormOwnProps>({
  form,
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate,
  initialValues: {
    created: new Date(),
    question: true,
  },
});
