import React from 'react';
import {
  AddToBrowserMessageBox,
  SlowerMessageBox,
  PrivacyMessageBox,
  ExplainingVideoMessageBox
} from './';

export default {
  title: 'Components/Molecules/SidebarBox'
};

export const Normal = () => <SlowerMessageBox />;

Normal.story = {
  name: 'normal'
};

export const WithList = () => <PrivacyMessageBox />;

WithList.story = {
  name: 'with list'
};

export const WithAction = () => <AddToBrowserMessageBox />;

WithAction.story = {
  name: 'with action'
};

export const WithVideo = () => <ExplainingVideoMessageBox />;

WithVideo.story = {
  name: 'with video'
};
