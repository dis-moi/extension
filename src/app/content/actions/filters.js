import {
  DEACTIVATED_WEBSITES,
  INSTALLED_DETAILS,
  CRITERIA,
  SELECT_CRITERION,
  UNSELECT_CRITERION,
  EDITORS,
  EXCLUDE_EDITOR,
  INCLUDE_EDITOR
} from '../../constants/ActionTypes';
import createAction from '../../utils/createAction';
import createBackgroundAction from '../createBackgroundAction';

export const updateDeactivatedWebsites = createAction(
  DEACTIVATED_WEBSITES,
  deactivatedWebsites => ({ deactivatedWebsites })
);
export const updateInstalledDetails = createAction(INSTALLED_DETAILS, onInstalledDetails => ({ onInstalledDetails }));
export const updateCriteria = createAction(CRITERIA, criteria => ({ criteria }));
export const selectCriterion = createBackgroundAction(SELECT_CRITERION, slug => ({ slug }));
export const unselectCriterion = createBackgroundAction(UNSELECT_CRITERION, slug => ({ slug }));
export const updateEditors = createAction(EDITORS, (editors = []) => ({ editors }));
export const excludeEditor = createBackgroundAction(EXCLUDE_EDITOR, id => ({ id }));
export const includeEditor = createBackgroundAction(INCLUDE_EDITOR, id => ({ id }));
