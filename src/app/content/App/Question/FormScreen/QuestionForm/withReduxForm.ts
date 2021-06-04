import { reduxForm } from 'redux-form';
import validate from 'libs/domain/contribution/validateForm';
import { Question } from 'libs/domain/notice';
import { QuestionFormOwnProps } from './QuestionForm';

export const form = 'question';

export default reduxForm<Question, QuestionFormOwnProps>({
  form,
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate,
  initialValues: {
    created: new Date(),
    question: true
  }
});
