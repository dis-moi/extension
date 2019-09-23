/* eslint-disable no-unused-expressions */
import { expect } from 'chai';
import { generateContributor } from 'test/fakers/generateContributor';
import {
  getContributors,
  getContributorsSuggestions,
  getSubscriptions,
  makeGetNContributorsSuggestions
} from './contributors.selectors';
import { ContributorsState } from '../reducers/contributors.reducer';

describe('options > selectors > contributors', () => {
  const contributorOne = generateContributor({ contributions: 100 });
  const contributorTwo = {
    ...generateContributor({ contributions: 2 }),
    subscribed: true
  };
  const contributorThree = generateContributor({ contributions: 55 });

  const state: { contributors: ContributorsState } = {
    contributors: [contributorOne, contributorTwo, contributorThree]
  };

  describe('getContributors', () => {
    it('returns contributors state', () => {
      expect(getContributors(state)).to.eql([
        contributorOne,
        contributorTwo,
        contributorThree
      ]);
    });
  });
  describe('getSubscriptions', () => {
    it('returns subscribed contributors', () => {
      expect(getSubscriptions(state)).to.eql([contributorTwo]);
    });
  });
  describe('getContributorsSuggestions', () => {
    it('returns contributors sorted by contributions', () => {
      expect(getContributorsSuggestions(state)).to.eql([
        contributorOne,
        contributorThree,
        contributorTwo
      ]);
    });
  });

  describe('makeGetNContributorsSuggestions', () => {
    describe('with limit higher than available suggestions', () => {
      it('returns a selector for all the suggestions', () => {
        expect(makeGetNContributorsSuggestions(10)(state)).to.eql([
          contributorOne,
          contributorThree,
          contributorTwo
        ]);
      });
    });
    describe('with limit lower than available suggestions', () => {
      it('returns a selector for first N suggestions', () => {
        expect(makeGetNContributorsSuggestions(2)(state)).to.eql([
          contributorOne,
          contributorThree
        ]);
      });
    });
  });
});
