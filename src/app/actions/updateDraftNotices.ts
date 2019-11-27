import { BaseAction } from '.';

export const UPDATE_DRAFT_NOTICES = 'UPDATE_DRAFT_NOTICES';
interface UpdateDraftNoticesAction extends BaseAction {
  type: typeof UPDATE_DRAFT_NOTICES;
  payload: { drafts: {} };
}

const updateDraftNotices = (drafts: {}): UpdateDraftNoticesAction => ({
  type: UPDATE_DRAFT_NOTICES,
  payload: { drafts }
});

export default updateDraftNotices;
