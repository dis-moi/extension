/* eslint-disable @typescript-eslint/ban-ts-comment, no-unused-expressions */
import { expect } from 'chai';
import {
  getTitle,
  isLoaded,
  isMounted,
  isOpen,
  StateWithUI
} from './ui.selectors';

const someClosedNeverOpenedState: StateWithUI = {
  ui: {
    title: 'some title',
    notification: {
      mounted: false,
      loaded: false,
      open: false
    }
  }
};

const someLoadingState: StateWithUI = {
  ui: {
    title: 'loading',
    notification: {
      mounted: true,
      loaded: false,
      open: true
    }
  }
};

const someOpenState: StateWithUI = {
  ui: {
    title: 'the title',
    notification: {
      mounted: true,
      loaded: true,
      open: true
    }
  }
};

const someClosedButAlreadyOpenedState: StateWithUI = {
  ui: {
    title: 'some title',
    notification: {
      mounted: true,
      loaded: false,
      open: false
    }
  }
};

describe('content > selectors > ui', () => {
  describe('getTitle', () => {
    it('returns notification title', () => {
      expect(getTitle(someClosedNeverOpenedState)).to.equal('some title');
    });
  });
  describe('isMounted', () => {
    it('returns true if app is mounted', () => {
      expect(isMounted(someClosedNeverOpenedState)).to.be.false;
      expect(isMounted(someLoadingState)).to.be.true;
      expect(isMounted(someOpenState)).to.be.true;
      expect(isMounted(someClosedButAlreadyOpenedState)).to.be.true;
    });
  });
  describe('isOpen', () => {
    it('returns true if app has finished (fake) loading', () => {
      expect(isOpen(someClosedNeverOpenedState)).to.be.false;
      expect(isOpen(someLoadingState)).to.be.true;
      expect(isOpen(someOpenState)).to.be.true;
      expect(isOpen(someClosedButAlreadyOpenedState)).to.be.false;
    });
  });
  describe('isLoaded', () => {
    it('returns true if app has finished (fake) loading', () => {
      expect(isLoaded(someClosedNeverOpenedState)).to.be.false;
      expect(isLoaded(someLoadingState)).to.be.false;
      expect(isLoaded(someOpenState)).to.be.true;
      expect(isLoaded(someClosedButAlreadyOpenedState)).to.be.false;
    });
  });
});
