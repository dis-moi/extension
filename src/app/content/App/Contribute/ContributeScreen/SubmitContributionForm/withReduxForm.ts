import { reduxForm } from 'redux-form';
import validate from 'app/lmem/contribution/validateForm';
import { Contribution } from 'app/lmem/notice';
import { SubmitContributionFormOwnProps } from './SubmitContributionForm';

export const form = 'contribution';

export default reduxForm<Contribution, SubmitContributionFormOwnProps>({
  form,
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate,
  initialValues: {
    created: new Date()
  }
});
