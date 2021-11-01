import React from 'react';
import VideoModal, { VideoModalProps } from './VideoModal';

export default {
  title: 'Website/Atoms/VideoModal',
  argTypes: {
    src: {
      control: { type: 'text' }
    },
    title: {
      control: { type: 'text' }
    }
  }
};

export const _VideoModal = (args: VideoModalProps) => <VideoModal {...args} />;
_VideoModal.args = {
  open: true,
  setOpen: () => {
    return true;
  },
  src: 'https://www.youtube.com/embed/y5_qCUhID4Y',
  title: 'Comment fonctionne l’extension DisMoi ?'
};
