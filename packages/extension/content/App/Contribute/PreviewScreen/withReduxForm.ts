import { reduxForm } from 'redux-form';
import { Contribution } from '@dismoi/domain/notice';
import validate from '@dismoi/domain/contribution/validateForm';
import { form } from '../ContributeScreen/SubmitContributionForm/withReduxForm';
import { PreviewScreenOwnProps } from './PreviewScreen';

export default reduxForm<Contribution, PreviewScreenOwnProps>({
  form,
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate,
});
