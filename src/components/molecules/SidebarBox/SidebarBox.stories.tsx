import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  AddToBrowserMessageBox,
  SlowerMessageBox,
  PrivacyMessageBox
} from './';

storiesOf('Components/Molecules/SidebarBox', module)
  .add('normal', () => <SlowerMessageBox />)
  .add('with list', () => <PrivacyMessageBox />)
  .add('with action', () => <AddToBrowserMessageBox />);
