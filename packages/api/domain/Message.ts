// Reproduces MessagePresenter of the PHP backend down to its arbitrary
// details, which are already in the chrome.storage.sync of hundreds of
// thousands of installations. Message.spec.ts states them one by one; any
// improvement here is a regression people can see.

import { TOP_LEVEL_DOMAINS } from './topLevelDomains';
import { mergeQueryParameter } from './Uri';

export const UTM_MEDIUM = 'Dismoi_extension_navigateur';

export const ALLOWED_TAGS = ['p', 'a'] as const;

const nl2br = (text: string): string =>
  text.replace(/\r\n|\n\r|\n|\r/g, (ending) => `<br />${ending}`);

const asParagraphs = (text: string): string =>
  `<p>${nl2br(text)}</p>`.replace(/(?:<br[^>]*\/>\s*){2,}/g, '</p><p>');

const withoutTags = (html: string): string => html.replace(/<[^>]*>/g, '');

// htmlspecialchars($v, ENT_COMPAT | ENT_HTML401, …, false): the apostrophe
// is deliberately left alone, and an entity already written is not escaped
// twice.
const escape = (text: string): string =>
  text
    .replace(/&(?!#?[0-9a-zA-Z]+;)/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

const looksLikeUrl = (url: string): boolean => {
  if (SCHEME.test(url)) return true;

  const host = url.split(/[/?#:]/, 1)[0] ?? '';
  const labels = host.split('.');
  const tail = labels[labels.length - 1];

  return (
    labels.length > 1 &&
    tail !== undefined &&
    TOP_LEVEL_DOMAINS.has(tail.toLowerCase())
  );
};

// Accented labels so that Résilier.com is captured whole. Braces and angle
// brackets stop the path: six notices carry
// ?fh_location=/manufacturer%3E{12637}#, and production stops its link
// there.
const BARE_URL =
  /(?:https?:\/\/)?(?:[\p{L}\p{N}](?:[\p{L}\p{N}-]*[\p{L}\p{N}])?\.)+\p{L}{2,}(?::\d{1,5})?(?:[/?#][^\s<>"'{}|^`\\]*)?/gu;

const TRAILING_PUNCTUATION = /[.,;:!?)\]}'"»…]+$/;

const SCHEME = /^https?:\/\//i;

// The message is already HTML here, so an &amp; is markup and not a
// separator: ?controller=search&amp;s=galaxy+S10 links to
// ?controller=search. A bare & is part of the URL.
const HTML_ENTITY = /&(?:amp|lt|gt|quot|apos|nbsp|#\d+|#x[0-9a-fA-F]+);/;

const label = (url: string): string => {
  const withoutScheme = url.replace(SCHEME, '');
  const pathEnd = withoutScheme.search(/[?#]/);
  return pathEnd === -1 ? withoutScheme : withoutScheme.slice(0, pathEnd);
};

const link = (url: string): string => {
  const href = SCHEME.test(url) ? url : `http://${url}`;
  return `<a href="${href}">${escape(label(url))}</a>`;
};

const belongsToAnEmailAddress = (
  text: string,
  start: number,
  url: string,
): boolean => text[start - 1] === '@' || text[start + url.length] === '@';

const followsASlash = (text: string, start: number): boolean =>
  text[start - 1] === '/';

const trimToUrl = (found: string): string => {
  const entity = HTML_ENTITY.exec(found);
  const beforeEntity = entity === null ? found : found.slice(0, entity.index);

  const punctuation = TRAILING_PUNCTUATION.exec(beforeEntity);
  return punctuation === null
    ? beforeEntity
    : beforeEntity.slice(0, -punctuation[0].length);
};

const linkInsideText = (text: string): string => {
  let sortie = '';
  let curseur = 0;

  BARE_URL.lastIndex = 0;
  for (
    let found = BARE_URL.exec(text);
    found !== null;
    found = BARE_URL.exec(text)
  ) {
    const url = trimToUrl(found[0]);

    // Two refusals recovered from differently: a host inside an address is
    // stepped over whole, or mx.fr would be linked inside balicoco@gmx.fr;
    // an invalid top-level domain is retried one character later, or
    // française.https://www.exemple.fr would lose its https://.
    if (
      belongsToAnEmailAddress(text, found.index, url) ||
      followsASlash(text, found.index)
    ) {
      BARE_URL.lastIndex = found.index + found[0].length;
      continue;
    }

    if (url === '' || !looksLikeUrl(url)) {
      BARE_URL.lastIndex = found.index + 1;
      continue;
    }

    sortie += escape(text.slice(curseur, found.index)) + link(url);
    curseur = found.index + url.length;
    BARE_URL.lastIndex = curseur;
  }

  return sortie + escape(text.slice(curseur));
};

// linkUrlsInTrustedHtml of urllinker: tags are walked through as they are
// and text nodes are escaped — without that, 358 of the 2,037 served
// messages differ.
const linkBareUrls = (html: string): string => {
  const pieces = html.split(/(<[^>]*>)/);
  let profondeurLien = 0;

  return pieces
    .map((morceau) => {
      if (morceau.startsWith('<')) {
        if (/^<a[\s>]/i.test(morceau)) profondeurLien += 1;
        else if (/^<\/a\s*>/i.test(morceau))
          profondeurLien = Math.max(0, profondeurLien - 1);
        return morceau;
      }

      if (morceau === '' || profondeurLien > 0) return morceau;

      return linkInsideText(morceau);
    })
    .join('');
};

const rewriteAnchors = (html: string, utmMedium: string): string =>
  html.replace(
    /<a ([^>]*)href="([^"]+)"([^>]*)>([^<]+)<\/a>/g,
    (_entier, avant: string, href: string, apres: string, text: string) => {
      const address = mergeQueryParameter(
        withoutTags(href),
        'utm_medium',
        utmMedium,
      );
      return `<a ${avant} ${apres} href="${address}" target="_blank" rel="noopener noreferrer">${text}</a>`;
    },
  );

export const renderMessage = (
  message: string,
  utmMedium: string = UTM_MEDIUM,
): string => rewriteAnchors(linkBareUrls(asParagraphs(message)), utmMedium);

export const stripMessage = (message: string): string =>
  asParagraphs(withoutTags(message));
