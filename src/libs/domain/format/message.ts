import getMessageWithMediaPlayer from 'libs/utils/getMessageWithMediaPlayer';

export const formatMessage = (message: string): string => {
  return getMessageWithMediaPlayer(message) || message;
};
