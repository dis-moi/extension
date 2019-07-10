import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { Intention } from 'app/lmem/intention';
import { State } from 'app/content/store';
import { getURL } from 'app/content/selectors';

export default connect(
  (state: State) => ({
    initialValues: {
      intention: 'approval' as Intention,
      url: getURL(state),
      created: new Date()
    }
  }),
  {
    onSubmit: () => push('/contribute/preview')
  }
);
