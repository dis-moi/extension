import { compose } from 'redux';
import withConnect from './withConnect';
import withTitle from '../../../../../libs/hocs/withTitle';
import Subscriptions, { SubscriptionsScreenProps } from './Subscriptions';

export default compose(
  withConnect,
  withTitle<SubscriptionsScreenProps>('title.subscriptions')
)(Subscriptions);
