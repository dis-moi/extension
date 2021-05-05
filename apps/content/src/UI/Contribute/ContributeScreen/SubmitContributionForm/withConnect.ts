import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { ContentState } from 'apps/content/src/store';
import { getFlatFormErrors } from 'apps/content/src/selectors';
import { form } from './withReduxForm';
import { change } from 'redux-form';

export default connect(
  (state: ContentState) => ({
    errors: getFlatFormErrors(form)(state)
  }),
  {
    onUrlChange: (url: string) => change('contribution', 'url', url),
    onSubmit: () => push('/contribute/preview')
  }
);
