export const youtubeRegex = /(<a [ "'a-zA-Z0-9_?=/-]*?href=["']?)?(https?:\/\/)?(www\.)?(youtube\.com)(\/)(watch\?v=|embed\/)([a-zA-Z0-9_?=/-]+)(.*?<\/a>)?/g;

const getMessageWithMediaPlayer = (message: string): string | null => {
  const youtubeLink = youtubeRegex.exec(message);
  if (!youtubeLink) return null;

  const mediaLink = youtubeLink[0]
    .replace(youtubeLink[1], '')
    .replace(youtubeLink[8], '')
    .replace(youtubeLink[6], 'embed/');

  const replaceValue = `<div style='margin:16px 16px 0 0'><iframe width='100%' height='auto' src=${mediaLink} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen/></div>`;

  return message + replaceValue;
};

export default getMessageWithMediaPlayer;
