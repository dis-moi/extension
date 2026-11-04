import { formValueSelector, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { ContentState } from 'app/content/store/reducers';
import validate from '@dismoi/domain/contribution/validateForm';
import { Contribution } from '@dismoi/domain/notice';
import { SubmitContributionFormOwnProps } from './SubmitContributionForm';

export const form = 'contribution';

const getMessageValue = (state: ContentState) => ({
  message: formValueSelector(form)(state, 'message'),
});

export const withMessageValue = connect(getMessageValue);

export default reduxForm<Contribution, SubmitContributionFormOwnProps>({
  form,
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate,
  initialValues: {
    created: new Date(),
  },
});
