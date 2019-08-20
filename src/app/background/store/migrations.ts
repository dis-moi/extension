import { createMigrate } from 'redux-persist';
import { MigrationManifest, PersistedState } from 'redux-persist/es/types';
import * as R from 'ramda';
import * as RA from 'ramda-adjunct';
import { Criteria } from '../../lmem/criterion';
import { InstallationDetails } from '../../lmem/installation';
import { State } from '../../content/store';
import { StatefulNotice } from '../../lmem/notice';

const overProp = (prop: string) => R.over(R.lensProp(prop));
const overState = overProp('state');
const overNotices = overProp('notices');

interface StateV0V1orV2 extends PersistedState {
  prefs?: {
    websites: unknown;
    criteria: Criteria;
    editors: { [id: number]: unknown };
    dismissedRecos: number[];
    approvedRecos: number[];
    onInstalledDetails: InstallationDetails;
  };
  websites?: unknown;
  criteria?: Criteria;
  editors?: { [id: number]: unknown };
  dismissedRecos?: number[];
  approvedRecos?: number[];
  dismissedNotices?: number[];
  likedNotices?: number[];
  dislikedNotices?: number[];
  onInstalledDetails?: InstallationDetails;
}

interface StateV1Prefs {
  websites: unknown;
  criteria: Criteria;
  editors: { [id: number]: unknown };
  dismissedRecos?: number[];
  approvedRecos?: number[];
  dismissedNotices?: number[];
  likedNotices?: number[];
  dislikedNotices?: number[];
  onInstalledDetails: InstallationDetails;
}
interface StateV1orV2 extends PersistedState {
  prefs: StateV1Prefs;
}

interface StateV2Prefs {
  websites: unknown;
  criteria: Criteria;
  editors: { [id: number]: unknown };
  dismissedNotices: number[];
  likedNotices: number[];
  dislikedNotices: number[];
  onInstalledDetails: InstallationDetails;
}
interface StateV2 extends PersistedState {
  prefs: StateV2Prefs;
}

interface StatefulNoticeV3 {
  state: {
    read: boolean;
    liked: boolean;
    justLiked?: boolean;
    disliked: boolean;
    justDisliked?: boolean;
    dismissed: boolean;
    justDismissed?: boolean;
  };
  id: number;
  created: object;
  modified: object;
  intention: string;
  contributor: object;
  message: string;
  source?: object;
  ratings: object;
  visibility: string;
}

interface StateV3 extends PersistedState {
  installationDetails: InstallationDetails;
  ui: {
    open: boolean;
    mounted: boolean;
    title: string;
  };
  notices: StatefulNoticeV3[];
  tab: object | null;
  router: object;
}

const migrations: MigrationManifest = {
  // 26-01-2017
  1: (persistedState: PersistedState): StateV1orV2 => {
    const previousState: StateV0V1orV2 = persistedState as StateV0V1orV2;

    return R.compose(
      R.compose(
        R.assocPath(
          ['prefs', 'websites'],
          previousState && previousState.prefs
            ? previousState.prefs.websites
            : previousState.websites || []
        ),
        R.assocPath(
          ['prefs', 'criteria'],
          previousState && previousState.prefs
            ? previousState.prefs.criteria
            : previousState.criteria || []
        ),
        R.assocPath(
          ['prefs', 'editors'],
          previousState && previousState.prefs
            ? previousState.prefs.editors
            : previousState.editors || []
        ),
        R.assocPath(
          ['prefs', 'dismissedRecos'],
          previousState && previousState.prefs
            ? previousState.prefs.dismissedRecos
            : previousState.dismissedRecos || []
        ),
        R.assocPath(
          ['prefs', 'approvedRecos'],
          previousState && previousState.prefs
            ? previousState.prefs.approvedRecos
            : previousState.approvedRecos || []
        ),
        R.assocPath(
          ['prefs', 'onInstalledDetails'],
          previousState && previousState.prefs
            ? previousState.prefs.onInstalledDetails
            : previousState.onInstalledDetails || []
        )
      ),
      R.compose(
        R.dissoc('websites'),
        R.dissoc('criteria'),
        R.dissoc('editors'),
        R.dissoc('dismissedRecos'),
        R.dissoc('approvedRecos'),
        R.dissoc('onInstalledDetails')
      )
    )(previousState) as StateV1orV2;
  },
  // V2 - March 2019 - 2019-02-11
  2: (persistedState: PersistedState): StateV2 => {
    const previousState = persistedState as StateV1orV2;

    return R.compose(
      R.assocPath(
        ['prefs', 'dismissedNotices'],
        previousState.prefs.dismissedRecos ||
          previousState.prefs.dismissedNotices ||
          []
      ),
      R.assocPath(
        ['prefs', 'likedNotices'],
        previousState.prefs.approvedRecos ||
          previousState.prefs.likedNotices ||
          []
      ),
      R.assocPath(
        ['prefs', 'dismissedNotices'],
        previousState.prefs.dismissedNotices || []
      ),
      R.dissocPath(['prefs', 'dismissedRecos']),
      R.dissocPath(['prefs', 'approvedRecos'])
    )(previousState) as StateV2;
  },
  // March 2019 - Typescript migration
  3: (persistedState: PersistedState): StateV3 => {
    const previousState = persistedState as StateV2;

    return R.compose(
      R.assocPath(
        ['prefs', 'installationDetails'],
        previousState.prefs.onInstalledDetails
      ),
      R.dissocPath(['prefs', 'websites'])
    )(previousState) as StateV3;
  },

  // August 2019 - rename readNotices to markedReadNotices
  4: (persistedState: PersistedState): State => {
    const previousState = persistedState as StateV3;

    const renameReadToMarkedRead = (notice: StatefulNoticeV3): StatefulNotice =>
      (overState(
        RA.renameKeys({ read: 'markedRead' }),
        notice
      ) as unknown) as StatefulNotice; // Ramda-adjunct TypeScript definition assumes renameKeys input and output is the same type. There is room for improvement

    // Ramda TypeScript definition assumes over input and output is the same type. There is room for improvement
    return (overNotices(
      R.map(renameReadToMarkedRead),
      previousState
    ) as unknown) as State;
  }

  // ADD NEW MIGRATIONS HEREUNDER
};

export const migrate = createMigrate(migrations, {
  debug: process.env.NODE_ENV !== 'production'
});

export default migrate;
