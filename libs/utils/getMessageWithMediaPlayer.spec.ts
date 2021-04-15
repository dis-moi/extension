import getMessageWithMediaPlayer from './getMessageWithMediaPlayer';
import { expect } from 'chai';

const player = `<iframe width='100%' height='auto' src=https://www.youtube.com/embed/5OQiE9Nj3ko allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen/>`;

const withLink =
  '<a href="https://www.youtube.com/watch?v=5OQiE9Nj3ko">voir la vidéo</a>';
const withoutLink = 'test https://www.youtube.com/watch?v=5OQiE9Nj3ko';

const withText =
  'Test <a href="test.com">test</a> and test <a href="https://www.youtube.com/watch?v=5OQiE9Nj3ko">voir la vidéo</a> and test';
const toMatchWithText = `Test <a href="test.com">test</a> and test ${player} and test`;

const withVideoFirst =
  '<a target="_blank" href="https://www.youtube.com/watch?v=5OQiE9Nj3ko" style="background:black;">voir la vidéo</a> Test <a href="test.com">test</a> and test and test';
const toMatchWithVideoFirst = `${player} Test <a href="test.com">test</a> and test and test`;

describe('Get message with youtube player', () => {
  it('should return player html with url with anchor', function() {
    const res = getMessageWithMediaPlayer(withLink);
    expect(res).to.equal(player);
  });
  it('should return player html with url with no anchor', function() {
    const res = getMessageWithMediaPlayer(withoutLink);
    expect(res).to.equal('test ' + player);
  });
  it('should return player html with url with no anchor and text', function() {
    const res = getMessageWithMediaPlayer(withText);
    expect(res).to.equal(toMatchWithText);
  });
  it('should return player and first then text', function() {
    const res = getMessageWithMediaPlayer(withVideoFirst);
    expect(res).to.equal(toMatchWithVideoFirst);
  });
});
