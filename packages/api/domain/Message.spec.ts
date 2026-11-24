import { describe, expect, it } from 'vitest';
import { renderMessage, stripMessage } from './Message';

const UTM = 'UTM_MEDIUM';

const normalise = (html: string): string =>
  html
    .replace(/>[^\S ]+/gs, '>')
    .replace(/[^\S ]+</gs, '<')
    .replace(/(\s)\s+/gs, '$1')
    .replace(/> </gs, '><');

const expecting = (message: string) => ({
  toRender: (expected: string) =>
    expect(normalise(renderMessage(message, UTM))).toBe(normalise(expected)),
});

describe('domain > rendering of a message', () => {
  describe('line breaks', () => {
    it('wraps a single line in a paragraph', () => {
      expecting('My simple content').toRender('<p>My simple content</p>');
    });

    it('turns a single break into a line break', () => {
      expecting('My simple content\nWith some other content. ').toRender(
        '<p>My simple content<br />With some other content. </p>',
      );
    });

    it('handles Windows line endings too', () => {
      expecting('My simple content\r\nWith some other content. ').toRender(
        '<p>My simple content<br />With some other content. </p>',
      );
    });

    it('handles lone carriage returns too', () => {
      expecting('My simple content\rWith some other content. ').toRender(
        '<p>My simple content<br />With some other content. </p>',
      );
    });

    it('turns a double break into a paragraph change', () => {
      expecting('My simple content\n\nWith some other content. ').toRender(
        '<p>My simple content</p><p>With some other content. </p>',
      );
    });

    it('opens no empty paragraph for three breaks', () => {
      expecting('My simple content\n\n\nWith some other content. ').toRender(
        '<p>My simple content</p><p>With some other content. </p>',
      );
    });
  });

  describe('links already written in HTML', () => {
    it('adds the target, the security attributes and the tracking', () => {
      expecting('<a href="https://lmem.net">lmem</a>').toRender(
        `<p><a href="https://lmem.net?utm_medium=${UTM}" target="_blank" rel="noopener noreferrer">lmem</a></p>`,
      );
    });
  });

  describe('bare URLs', () => {
    it('links a complete URL, shortening its label', () => {
      expecting(
        'Un lien vers https://lmem.net/jeanmichel?ilenveut&bien=1&de=plus',
      ).toRender(
        `<p>Un lien vers <a href="https://lmem.net/jeanmichel?ilenveut&bien=1&de=plus&utm_medium=${UTM}" target="_blank" rel="noopener noreferrer">lmem.net/jeanmichel</a></p>`,
      );
    });

    it('prefixes http:// when the scheme is missing', () => {
      expecting('Un lien vers www.lmem.net').toRender(
        `<p>Un lien vers <a href="http://www.lmem.net?utm_medium=${UTM}" target="_blank" rel="noopener noreferrer">www.lmem.net</a></p>`,
      );
      expecting('Un lien vers lmem.net/path').toRender(
        `<p>Un lien vers <a href="http://lmem.net/path?utm_medium=${UTM}" target="_blank" rel="noopener noreferrer">lmem.net/path</a></p>`,
      );
    });

    it('drops the scheme from the label but keeps it in the link', () => {
      expecting('Un lien vers http://lmem.net').toRender(
        `<p>Un lien vers <a href="http://lmem.net?utm_medium=${UTM}" target="_blank" rel="noopener noreferrer">lmem.net</a></p>`,
      );
    });

    it('drops the query string from the label', () => {
      expecting('https://www.youtube.com/watch?v=Hkom7MeY5bk').toRender(
        `<p><a href="https://www.youtube.com/watch?v=Hkom7MeY5bk&utm_medium=${UTM}" target="_blank" rel="noopener noreferrer">www.youtube.com/watch</a></p>`,
      );
      expecting(
        'http://www.driiveme.com/partenaire/villea_villeb.html?partnerId=60',
      ).toRender(
        `<p><a href="http://www.driiveme.com/partenaire/villea_villeb.html?partnerId=60&utm_medium=${UTM}" target="_blank" rel="noopener noreferrer">www.driiveme.com/partenaire/villea_villeb.html</a></p>`,
      );
      expecting(
        'https://www.leboncoin.fr/recherche/?category=12&locations=Avignon&utm_source=lmem_assistant',
      ).toRender(
        `<p><a href="https://www.leboncoin.fr/recherche/?category=12&locations=Avignon&utm_source=lmem_assistant&utm_medium=${UTM}" target="_blank" rel="noopener noreferrer">www.leboncoin.fr/recherche/</a></p>`,
      );
    });

    it('keeps the trailing slash of the path', () => {
      expecting('https://www.quechoisir.org/dossier-lave-linge-t387/').toRender(
        `<p><a href="https://www.quechoisir.org/dossier-lave-linge-t387/?utm_medium=${UTM}" target="_blank" rel="noopener noreferrer">www.quechoisir.org/dossier-lave-linge-t387/</a></p>`,
      );
    });
  });

  describe('tracking', () => {
    it('replaces an existing utm_medium in place, rather than moving it to the end', () => {
      expecting(
        'Un lien vers https://lmem.net/jeanmichel?ilenveut&utm_source=duckduckgo&utm_medium=some_medium&utm_term=search&bien=1&de=plus',
      ).toRender(
        `<p>Un lien vers <a href="https://lmem.net/jeanmichel?ilenveut&utm_source=duckduckgo&utm_medium=${UTM}&utm_term=search&bien=1&de=plus" target="_blank" rel="noopener noreferrer">lmem.net/jeanmichel</a></p>`,
      );
    });

    it('keeps a query key with no value', () => {
      expecting('https://lmem.net/?seul').toRender(
        `<p><a href="https://lmem.net/?seul&utm_medium=${UTM}" target="_blank" rel="noopener noreferrer">lmem.net/</a></p>`,
      );
    });
  });

  describe('version without tags', () => {
    it('removes the tags before paragraphing', () => {
      expect(normalise(stripMessage('<b>gras</b>\n\nsuite'))).toBe(
        normalise('<p>gras</p><p>suite</p>'),
      );
    });

    it('leaves bare text untouched', () => {
      expect(normalise(stripMessage('simple'))).toBe(
        normalise('<p>simple</p>'),
      );
    });

    it('links no URL', () => {
      expect(stripMessage('voir https://lmem.net')).not.toContain('<a');
    });
  });
});
