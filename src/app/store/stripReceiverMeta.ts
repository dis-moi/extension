import * as R from 'ramda';
import { PortAction } from './types';

const stripReceiverMeta = R.dissocPath<PortAction>(['meta', 'receiver']);

export default stripReceiverMeta;
