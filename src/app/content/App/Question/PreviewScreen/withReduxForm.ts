import { reduxForm } from 'redux-form';
import { Question } from 'libs/lmem/notice';
import validate from 'libs/lmem/contribution/validateForm';
import { form } from '../FormScreen/QuestionForm/withReduxForm';
import { PreviewScreenOwnProps } from './PreviewScreen';

export default reduxForm<Question, PreviewScreenOwnProps>({
  form,
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate
});
