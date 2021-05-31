import { compose } from 'redux';
import withTitle from 'app/content/hocs/withTitle';
import withConnect from './withConnect';
import Subscriptions, { SubscriptionsScreenProps } from './Subscriptions';

export default compose(
  withConnect,
  withTitle<SubscriptionsScreenProps>('title.subscriptions')
)(Subscriptions);
