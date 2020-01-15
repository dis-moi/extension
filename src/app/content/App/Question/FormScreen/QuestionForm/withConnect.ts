import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { ContentState } from 'app/content/store';
import { getFlatFormErrors } from 'app/content/selectors';
import { form } from './withReduxForm';
import { change } from 'redux-form';

export default connect(
  (state: ContentState) => ({
    errors: getFlatFormErrors(form)(state)
  }),
  {
    onUrlChange: (url: string) => change('question', 'url', url),
    onSubmit: () => push('/question/preview')
  }
);
