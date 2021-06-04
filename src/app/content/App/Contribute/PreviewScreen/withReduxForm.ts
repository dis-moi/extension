import { reduxForm } from 'redux-form';
import { Contribution } from 'libs/domain/notice';
import validate from 'libs/domain/contribution/validateForm';
import { form } from '../ContributeScreen/SubmitContributionForm/withReduxForm';
import { PreviewScreenOwnProps } from './PreviewScreen';

export default reduxForm<Contribution, PreviewScreenOwnProps>({
  form,
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate
});
