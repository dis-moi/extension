import { expect } from 'chai';
import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { getTheme } from 'libs/facets/getTheme';
import Notification from './index';

describe('ui > organisms > Notification', function () {
  let container: HTMLDivElement;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let root: any;

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

  it('ne pose pas son drapeau de style sur le DOM', () => {
    // `Main` enveloppe `animated.main`, donc un composant et non une balise :
    // styled-components ne filtre alors plus les props inconnues du DOM, et
    // React se plaint d’un attribut `hasnotices` qu’il ne reconnaît pas.
    //
    // Honnêteté sur la portée : sous jsdom, react-spring ne transmet pas la
    // prop et cet exemple passait déjà avant le correctif. Il fixe l’attendu
    // et vérifie que l’arbre se monte ; c’est le navigateur qui a montré
    // l’avertissement, et c’est lui qui atteste sa disparition.
    act(() => {
      root.render(
        React.createElement(
          MemoryRouter,
          null,
          React.createElement(
            ThemeProvider,
            { theme: getTheme() },
            React.createElement(Notification, { hasNotices: true }),
          ),
        ),
      );
    });

    const main = container.querySelector('main');
    expect(main, 'le <main> doit être rendu').to.not.equal(null);
    expect(main?.getAttributeNames()).to.not.include('hasnotices');
  });
});
