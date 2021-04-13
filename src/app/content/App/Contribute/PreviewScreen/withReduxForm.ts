import { reduxForm } from 'redux-form';
import { form } from '../ContributeScreen/SubmitContributionForm/withReduxForm';
import { PreviewScreenOwnProps } from './PreviewScreen';
import { Contribution } from 'app/lmem/notice';
import validate from 'app/lmem/contribution/validateForm';

export default reduxForm<Contribution, PreviewScreenOwnProps>({
  form,
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate
});
