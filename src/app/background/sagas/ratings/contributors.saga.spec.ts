import { expect } from 'chai';
import { isContributorRatingTypeAction } from './contributors.saga';
import { likeNotice, subscribe, unsubscribe } from 'app/actions';
import { generateContributor } from 'test/fakers/generateContributor';

describe('isContributorRatingTypeAction', function() {
  it('return true for a contributors ratings  action', () => {
    expect(isContributorRatingTypeAction(subscribe(1))).equals(true);
    expect(
      isContributorRatingTypeAction(unsubscribe(generateContributor()))
    ).equals(true);
  });

  it('return false for other actions', () => {
    expect(isContributorRatingTypeAction(likeNotice(1))).equals(false);
  });
});
