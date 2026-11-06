import { expect } from 'chai';
import React, { act } from 'react';
import { createRoot, Root } from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import { getTheme } from 'libs/facets/getTheme';
import ListLinks from './ListLinks';

/**
 * Les entrées de menu étaient des `<a>` sans `href`, la navigation passant par
 * un `onClick`. Aucun robot ne suit un lien pareil : au moment où le site
 * reprend le référencement de WordPress, c'est un trou. Ces exemples fixent
 * l'attendu — une vraie adresse dans le document.
 */
describe('ui > website > ListLinks', function () {
  let container: HTMLDivElement;
  let root: Root;

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

  const render = (links: { label: string; href: string }[]) => {
    act(() => {
      root.render(
        React.createElement(
          ThemeProvider,
          { theme: getTheme() },
          React.createElement(ListLinks, { links }),
        ),
      );
    });

    return Array.from(container.querySelectorAll('a'));
  };

  it('rend une ancre par entrée', () => {
    const ancres = render([
      { label: 'Aide', href: '/fr/aide' },
      { label: 'Contribuer', href: '/fr/contribuer' },
    ]);

    expect(ancres).to.have.lengthOf(2);
    expect(ancres.map((a) => a.textContent)).to.deep.equal([
      'Aide',
      'Contribuer',
    ]);
  });

  it('pose l’adresse sur l’ancre, pour qu’un robot la suive', () => {
    const ancres = render([{ label: 'Aide', href: '/fr/aide' }]);

    expect(ancres[0].getAttribute('href')).to.equal('/fr/aide');
  });
});
