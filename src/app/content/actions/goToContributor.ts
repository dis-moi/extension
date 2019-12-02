import { push } from 'connected-react-router';

export default (contributorId: number) =>
  push(`/contributor/${contributorId.toString(10)}`);
