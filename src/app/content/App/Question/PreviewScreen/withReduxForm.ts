import { reduxForm } from 'redux-form';
import { Contribution } from 'app/lmem/notice';
import { form } from '../FormScreen/QuestionForm/withReduxForm';
import validate from 'app/lmem/contribution/validateForm';
import { PreviewScreenOwnProps } from './PreviewScreen';

export default reduxForm<Contribution, PreviewScreenOwnProps>({
  form,
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate
});
