import { expect } from 'chai';
import React, { act } from 'react';
import { createRoot, Root } from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import { getTheme } from 'libs/facets/getTheme';
import { Input, Select, Textarea } from './index';

/**
 * `error` n'est pas un attribut HTML : il ne sert qu'à choisir la couleur de
 * bordure. styled-components v5 filtrait de lui-même les props inconnues des
 * balises ; v6 ne le fait plus et les laisse atteindre le DOM, où React s'en
 * plaint. La prop devient donc transitoire — `$error` — et ces exemples fixent
 * les deux attentes : elle pilote bien le style, et elle ne sort jamais dans
 * le document.
 */
describe('ui > atoms > Forms', function () {
  const theme = getTheme();
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

  /**
   * styled-components écrit ses règles soit dans le texte de la balise
   * `<style>`, soit par l'API CSSOM selon son mode d'insertion. On lit donc
   * les deux pour ne pas dépendre de ce détail.
   */
  const injectedCss = (): string =>
    Array.from(document.querySelectorAll('style'))
      .map((tag) => {
        const rules = Array.from(tag.sheet?.cssRules ?? []).map(
          (rule) => rule.cssText,
        );

        return `${tag.textContent ?? ''}${rules.join('')}`;
      })
      .join('');

  const render = (
    component: React.ComponentType<Record<string, unknown>>,
    selector: string,
  ): HTMLElement => {
    act(() => {
      root.render(
        React.createElement(
          ThemeProvider,
          { theme },
          React.createElement(component, { $error: true }),
        ),
      );
    });

    const element = container.querySelector<HTMLElement>(selector);
    expect(element, `le <${selector}> doit être rendu`).to.not.equal(null);

    return element as HTMLElement;
  };

  const cases: [
    string,
    React.ComponentType<Record<string, unknown>>,
    string,
  ][] = [
    ['champ texte', Input as never, 'input'],
    ['liste déroulante', Select as never, 'select'],
    ['zone de texte', Textarea as never, 'textarea'],
  ];

  cases.forEach(([label, component, selector]) => {
    describe(label, function () {
      it('colore sa bordure avec la couleur d’erreur du thème', () => {
        render(component, selector);

        expect(injectedCss().toLowerCase()).to.include(
          theme.formError.toLowerCase(),
        );
      });

      it('ne pose pas le drapeau d’erreur sur le DOM', () => {
        expect(render(component, selector).getAttributeNames()).to.not.include(
          'error',
        );
      });
    });
  });
});
