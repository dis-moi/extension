import { reduxForm } from 'redux-form';
import { Question } from '@dismoi/domain/notice';
import validate from '@dismoi/domain/contribution/validateForm';
import { form } from '../FormScreen/QuestionForm/withReduxForm';
import { PreviewScreenOwnProps } from './PreviewScreen';

export default reduxForm<Question, PreviewScreenOwnProps>({
  form,
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate,
});
