import { reduxForm } from 'redux-form';
import { form } from '../FormScreen/QuestionForm/withReduxForm';
import { PreviewScreenOwnProps } from './PreviewScreen';
import { Question } from 'app/lmem/notice';
import validate from 'app/lmem/contribution/validateForm';

export default reduxForm<Question, PreviewScreenOwnProps>({
  form,
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate
});
