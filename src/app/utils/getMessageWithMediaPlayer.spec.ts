import getMessageWithMediaPlayer from './getMessageWithMediaPlayer';
import { expect } from 'chai';

const player = `<div style='margin:16px 16px 0 0'><iframe width='100%' height='auto' src=https://www.youtube.com/embed/5OQiE9Nj3ko allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen/></div>`;

const withText =
  'Test <a href="test.com">test</a> and test <a href="https://www.youtube.com/watch?v=5OQiE9Nj3ko">voir la vidéo</a> and test';

describe('Get message with youtube player', () => {
  it('should return player html with url with no anchor and text', function() {
    const res = getMessageWithMediaPlayer(withText);
    expect(res).to.equal(withText + player);
  });
});
