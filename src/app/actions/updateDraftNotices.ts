import { BaseAction } from '.';

interface UpdateDraftNoticesAction extends BaseAction {
  type: 'UPDATE_DRAFT_NOTICES';
  payload: { drafts: {} };
}

const updateDraftNotices = (drafts: {}): UpdateDraftNoticesAction => ({
  type: 'UPDATE_DRAFT_NOTICES',
  payload: { drafts }
});

export default updateDraftNotices;
