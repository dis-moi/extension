import React from 'react';
import ContributorModal, { ContributorModalProps } from './ContributorModal';

export default {
  title: 'Website/Atoms/ContributorModal',
  argTypes: {
    src: {
      control: { type: 'text' }
    },
    title: {
      control: { type: 'text' }
    }
  }
};

export const _ContributorModal = (args: ContributorModalProps) => (
  <ContributorModal {...args} />
);
_ContributorModal.args = {
  open: true,
  setOpen: () => {
    return true;
  },
  src: 'https://www.youtube.com/embed/y5_qCUhID4Y',
  title: 'Comment fonctionne l’extension DisMoi ?'
};
