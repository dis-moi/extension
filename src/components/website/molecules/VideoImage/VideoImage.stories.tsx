import React from 'react';
import Screenshot from 'assets/img/website/screenshots/dismoi-screenshot-amazon-antidote-mounted-website-desktop.jpg';
import VideoImage, { VideoImageProps } from './VideoImage';

export default {
  title: 'Website/Atoms/VideoImage',
  argTypes: {
    text: {
      control: { type: 'text' }
    },
    image: {
      control: { type: 'text' }
    }
  }
};

export const _VideoImage = (args: VideoImageProps) => <VideoImage {...args} />;
_VideoImage.args = {
  text: 'Découvrir comment fonctionne DisMoi en 1 minute',
  image: Screenshot
};
