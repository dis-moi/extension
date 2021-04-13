import { compose } from 'redux';
import withTitle from '../../../hocs/withTitle';
import withConnect from './withConnect';
import Subscriptions, { SubscriptionsScreenProps } from './Subscriptions';

export default compose(
  withConnect,
  withTitle<SubscriptionsScreenProps>('title.subscriptions')
)(Subscriptions);
