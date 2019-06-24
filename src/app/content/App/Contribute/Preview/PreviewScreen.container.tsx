import { connect } from 'react-redux';
import { compose } from 'redux';
import { goBack } from 'connected-react-router';

import withTitle from 'app/hocs/withTitle';
import { close } from 'app/actions/ui';
import { submitContribution } from 'app/actions/contribution';
import { getContribution } from 'app/content/selectors';
import { State } from 'app/content/store';
import PreviewScreen, { PreviewScreenOwnProps } from './PreviewScreen';

const mapDispatchToProps = {
  close,
  modify: goBack,
  publish: submitContribution
};

export default compose(
  connect(
    (state: State) => ({
      contribution: getContribution(state)
    }),
    mapDispatchToProps
  ),
  withTitle<PreviewScreenOwnProps>('Prévisualisation')
)(PreviewScreen);
