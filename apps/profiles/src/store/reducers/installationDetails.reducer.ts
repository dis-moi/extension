import createCollectionReducer, {
  CollectionState
} from 'src/app/store/collection/reducers';
import {
  REFRESH_CONTRIBUTORS,
  REFRESH_CONTRIBUTORS_FAILED,
  UPDATE_CONTRIBUTORS
} from 'src/app/actions';
import { StatefulContributor } from 'libs/lmem/contributor';

export type ContributorsCollectionState = CollectionState<StatefulContributor>;

export default createCollectionReducer<StatefulContributor>(
  REFRESH_CONTRIBUTORS,
  UPDATE_CONTRIBUTORS,
  REFRESH_CONTRIBUTORS_FAILED
);
