import getMessageWithMediaPlayer from '../../utils/getMessageWithMediaPlayer';

export const formatMessage = (message: string): string => {
  return getMessageWithMediaPlayer(message) || message;
};
