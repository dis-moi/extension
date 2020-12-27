const youtubeRegex = /(https?:\/\/)?(www\.)?(youtube\.com)(\/)(watch\?v=|embed\/)([a-zA-Z0-9_?=/-]+)/g;

const getMessageWithMediaPlayer = (message: string): string | null => {
  const youtubeLink = youtubeRegex.exec(message);
  if (!youtubeLink) return null;

  const mediaLink = youtubeLink[0].replace(youtubeLink[5], 'embed/');

  const replaceValue = `<iframe width='100%' height='auto' src=${mediaLink} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen/>`;
  return message.replace(youtubeRegex, replaceValue);
};

export default getMessageWithMediaPlayer;
