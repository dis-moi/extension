import { reduxForm } from 'redux-form';
import validate from 'app/lmem/contribution/validateForm';
import { Question } from 'app/lmem/notice';
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
