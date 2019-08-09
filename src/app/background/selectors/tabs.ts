import { BackgroundState } from '../reducers';
import { TabsState } from '../reducers/tabs';

export const getTabs = (state: BackgroundState): TabsState => state.tabs;
