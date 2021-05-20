import React from 'react';
import {
  AddToBrowserMessageBox,
  SlowerMessageBox,
  PrivacyMessageBox,
  ExplainingVideoMessageBox
} from './';
import { generateStatefulContributor } from 'test/fakers/generateContributor';

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

export const WithVideo = () => (
  <ExplainingVideoMessageBox contributor={generateStatefulContributor()} />
);

WithVideo.story = {
  name: 'with video'
};
