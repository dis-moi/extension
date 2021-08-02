import createCollectionReducer, {
  CollectionState
} from 'libs/store/collection/reducers';
import {
  REFRESH_CONTRIBUTORS,
  REFRESH_CONTRIBUTORS_FAILED,
  UPDATE_CONTRIBUTORS
} from 'libs/store/actions';
import { StatefulContributor } from 'libs/domain/contributor';

export type ContributorsCollectionState = CollectionState<StatefulContributor>;

export default createCollectionReducer<StatefulContributor>(
  REFRESH_CONTRIBUTORS,
  UPDATE_CONTRIBUTORS,
  REFRESH_CONTRIBUTORS_FAILED
);
