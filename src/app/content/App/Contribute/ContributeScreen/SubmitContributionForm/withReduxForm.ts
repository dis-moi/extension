import { reduxForm } from 'redux-form';
import validate from 'app/lmem/contribution/validateForm';
import { Contribution } from 'app/lmem/notice';
import { SubmitContributionFormOwnProps } from './SubmitContributionForm';
import { Intention } from '../../../../../lmem/intention';

export const form = 'contribution';

export default reduxForm<Contribution, SubmitContributionFormOwnProps>({
  form,
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate,
  initialValues: {
    intention: 'approval' as Intention,
    created: new Date()
  }
});
