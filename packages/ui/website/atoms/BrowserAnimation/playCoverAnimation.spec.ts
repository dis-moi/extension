import { expect } from 'chai';
import sinon from 'sinon';
import playCoverAnimation, {
  AnimateRuntime,
  COVER_ANIMATION,
} from './playCoverAnimation';

/**
 * L'animation de couverture est un export Adobe Animate : du code généré qui
 * s'appuie sur deux globales, `createjs` et `AdobeAn`. Ces exemples fixent ce
 * que le site en attend, avec des doublures à la place des deux globales.
 */
describe('ui > website > playCoverAnimation', function () {
  const fakeRuntime = () => {
    const rootClip = { name: 'root clip' };
    const stage = {
      scaleX: 1,
      scaleY: 1,
      addChild: sinon.spy(),
      removeAllChildren: sinon.spy(),
    };
    const library = {
      properties: { width: 440, height: 300, fps: 24 },
      Stage: sinon.stub().returns(stage),
      [COVER_ANIMATION.symbol]: sinon.stub().returns(rootClip),
    };
    const ticker = {
      framerate: 0,
      addEventListener: sinon.spy(),
      removeEventListener: sinon.spy(),
    };
    const runtime = {
      createjs: { Ticker: ticker },
      AdobeAn: {
        getComposition: sinon
          .stub()
          .withArgs(COVER_ANIMATION.compositionId)
          .returns({ getLibrary: () => library }),
      },
    } as unknown as AnimateRuntime;

    return { runtime, rootClip, stage, library, ticker };
  };

  it('draws the composition on the given canvas', () => {
    const canvas = document.createElement('canvas');
    const { runtime, rootClip, stage, library } = fakeRuntime();

    playCoverAnimation(canvas, runtime);

    expect(library.Stage.calledWithNew()).to.equal(true);
    expect(library.Stage.firstCall.args).to.deep.equal([canvas]);
    expect(stage.addChild.calledOnceWithExactly(rootClip)).to.equal(true);
  });

  it('advances the stage at the frame rate of the composition', () => {
    const { runtime, stage, ticker } = fakeRuntime();

    playCoverAnimation(document.createElement('canvas'), runtime);

    expect(ticker.framerate).to.equal(24);
    expect(
      ticker.addEventListener.calledOnceWithExactly('tick', stage),
    ).to.equal(true);
  });

  it('gives the canvas the size of the composition', () => {
    const canvas = document.createElement('canvas');
    const { runtime, stage } = fakeRuntime();

    playCoverAnimation(canvas, runtime);

    expect([canvas.width, canvas.height]).to.deep.equal([440, 300]);
    expect([stage.scaleX, stage.scaleY]).to.deep.equal([1, 1]);
  });

  it('draws more pixels on a high density screen, to stay sharp', () => {
    const canvas = document.createElement('canvas');
    const { runtime, stage } = fakeRuntime();

    playCoverAnimation(canvas, runtime, 2);

    expect([canvas.width, canvas.height]).to.deep.equal([880, 600]);
    expect([stage.scaleX, stage.scaleY]).to.deep.equal([2, 2]);
  });

  it('stops advancing the stage once stopped', () => {
    const { runtime, stage, ticker } = fakeRuntime();

    const stop = playCoverAnimation(document.createElement('canvas'), runtime);
    stop();

    expect(
      ticker.removeEventListener.calledOnceWithExactly('tick', stage),
    ).to.equal(true);
    expect(stage.removeAllChildren.calledOnce).to.equal(true);
  });

  it('says so when the animation script is not the expected one', () => {
    const { runtime } = fakeRuntime();
    (runtime.AdobeAn.getComposition as sinon.SinonStub).returns(undefined);

    expect(() =>
      playCoverAnimation(document.createElement('canvas'), runtime),
    ).to.throw(COVER_ANIMATION.compositionId);
  });
});
