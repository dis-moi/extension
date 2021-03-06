import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { change } from 'redux-form';
import { getFlatFormErrors } from 'app/content/store/selectors';
import { ContentState } from 'app/content/store/reducers';
import { getContributorsSortedAlphabetically } from 'libs/store/selectors/contributors.selectors';
import { form } from './withReduxForm';

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
