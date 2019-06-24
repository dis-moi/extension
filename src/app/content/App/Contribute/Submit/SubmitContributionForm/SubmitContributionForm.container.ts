import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import SubmitContributionForm, {
  SubmitContributionFormOwnProps
} from './SubmitContributionForm';
import { Contribution } from 'app/lmem/notice';
import { getURL } from 'app/content/selectors';
import { State } from 'app/content/store';
import validate from 'app/lmem/contribution/validateForm';
import { push } from 'connected-react-router';

export const form = 'contribution';

export default connect(
  (state: State) => ({
    initialValues: {
      intention: 'approval',
      url: getURL(state),
      created: new Date()
    }
  }),
  {
    onSubmit: () => push('/contribute/preview')
  }
)(
  // @ts-ignore
  reduxForm<Contribution, SubmitContributionFormOwnProps>({
    form,
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
    validate
  })(SubmitContributionForm)
);
