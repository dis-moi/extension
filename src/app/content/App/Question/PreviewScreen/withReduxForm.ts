import { reduxForm } from 'redux-form';
import { Question } from 'libs/domain/notice';
import validate from 'libs/domain/contribution/validateForm';
import { form } from '../FormScreen/QuestionForm/withReduxForm';
import { PreviewScreenOwnProps } from './PreviewScreen';

export default reduxForm<Question, PreviewScreenOwnProps>({
  form,
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate
});
