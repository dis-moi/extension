import { expect } from 'chai';
import React, { act } from 'react';
import { createRoot, Root } from 'react-dom/client';
import BrowserAnimation from './BrowserAnimation';

/**
 * Le script généré par Adobe Animate ne reçoit rien en paramètre : il lit ses
 * phrases et sa langue dans le document, sur l'élément `#variableWords`. C'est
 * ce contrat, invisible depuis React, que ces exemples protègent.
 */
describe('ui > website > BrowserAnimation', function () {
  let container: HTMLDivElement;
  let root: Root;

  const render = (words: string[], language: string) =>
    act(() =>
      root.render(React.createElement(BrowserAnimation, { words, language })),
    );

  beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (global as any).IS_REACT_ACT_ENVIRONMENT = true;
    container = document.createElement('div');
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
    document.querySelectorAll('script').forEach((script) => script.remove());
  });

  it('hands its sentences and its language over to the animation script', () => {
    render(['Les avis ne sont pas fiables', 'La qualité est douteuse'], 'fr');

    const variableWords = document.getElementById('variableWords');
    expect(variableWords?.dataset.word1).to.equal(
      'Les avis ne sont pas fiables',
    );
    expect(variableWords?.dataset.word2).to.equal('La qualité est douteuse');
    expect(variableWords?.dataset.language).to.equal('fr');
  });

  it('keeps the canvas out of the way of assistive technologies', () => {
    render([], 'en');

    const canvas = container.querySelector('canvas');
    expect(canvas?.getAttribute('aria-hidden')).to.equal('true');
  });
});
