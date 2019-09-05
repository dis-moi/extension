import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { Intention } from 'app/lmem/intention';
import { ContentState } from 'app/content/store';
import { getFlatFormErrors, getURL } from 'app/content/selectors';
import { form } from './withReduxForm';

export default connect(
  (state: ContentState) => ({
    initialValues: {
      intention: 'approval' as Intention,
      url: getURL(state),
      created: new Date()
    },
    errors: getFlatFormErrors(form)(state)
  }),
  {
    onSubmit: () => push('/contribute/preview')
  }
);
