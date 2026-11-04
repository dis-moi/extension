import { expect } from 'chai';
import React, { act } from 'react';
import { createRoot, Root } from 'react-dom/client';
import Truncated from './Truncated';

/**
 * Ces attentes fixent le comportement public du composant. Les anciens
 * `defaultProps` répétaient les valeurs que `truncate` applique déjà lui-même ;
 * les retirer ne change donc rien, et c'est précisément ce que ces exemples
 * vérifient.
 */
describe('ui > atoms > Truncated', function () {
  let container: HTMLDivElement;
  let root: Root;

  const render = (props: Record<string, unknown>) => {
    act(() => {
      root.render(React.createElement(Truncated, props));
    });
    return container.textContent;
  };

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
  });

  it('ne rend rien sans texte', () => {
    expect(render({ numberOfCharacters: 10 })).to.equal('');
  });

  it('coupe entre les mots par défaut', () => {
    expect(
      render({ numberOfCharacters: 10, children: 'un deux quatre' }),
    ).to.equal('un deux…');
  });

  it('coupe au caractère près quand on le demande', () => {
    expect(
      render({
        numberOfCharacters: 10,
        preserveWords: false,
        children: 'un deux quatre',
      }),
    ).to.equal('un deux q…');
  });

  it('laisse le texte intact quand aucune longueur n’est demandée', () => {
    expect(
      render({ numberOfCharacters: 0, children: 'un deux quatre' }),
    ).to.equal('un deux quatre');
  });
});
