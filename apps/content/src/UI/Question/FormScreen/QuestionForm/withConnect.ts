import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { change } from 'redux-form';
import { ContentState } from 'apps/content/src/store';
import { getFlatFormErrors } from 'apps/content/src/selectors';
import { form } from './withReduxForm';
import { getContributorsSortedAlphabetically } from 'libs/store/selectors/contributors.selectors';

export default connect(
  (state: ContentState) => ({
    errors: getFlatFormErrors(form)(state),
    contributors: getContributorsSortedAlphabetically(state)
  }),
  {
    onUrlChange: (url: string) => change('question', 'url', url),
    onSubmit: () => push('/question/preview')
  }
);
