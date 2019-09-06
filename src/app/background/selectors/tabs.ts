import { BackgroundState } from '../reducers';
import { TabsState } from '../reducers/tabs.reducer';

export const getTabs = (state: BackgroundState): TabsState => state.tabs;
