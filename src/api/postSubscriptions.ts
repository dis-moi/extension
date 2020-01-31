import { post } from './call';

const postSubscriptions = ({
  extensionId,
  subscriptions = []
}: {
  extensionId: number;
  subscriptions: number[];
}): Promise<void> => post(`subscriptions/${extensionId}`, subscriptions);

export default postSubscriptions;
