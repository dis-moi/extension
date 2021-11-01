import React from 'react';
import ToggleMenu, { ToggleMenuProps } from './ToggleMenu';

export default {
  title: 'Website/Atoms/ToggleMenu'
};

export const _ToggleMenu = (args: ToggleMenuProps) => <ToggleMenu {...args} />;
_ToggleMenu.args = {
  handleClick: () => false
};
