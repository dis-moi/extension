# Excluded matchings

There are different level of pages/contents excluded from the matching engine.

> Most of these mechanisms use an *exclude list* for the time being. 
> If possible we'd love to put in place an *allow list* system (see [#275](https://github.com/dis-moi/extension/issues/275))

## Browser
For example, `chrom*` browsers already forbid all content scripting on the following pages:
- new tab page
- `chrome://` URLs
- chrome web-store URLS

## Manifest file
There is a list of excluded pattern in the extension of the manifest: 
It doesn't inject the content script in pages matching those URLs patterns.
Thus, it doesn't run the matching engine against these URLs.

At the time of writing this consists in the following patterns:
```
exclude_globs: [
  '*.pdf*',
  '*.Pdf*',
  '*.PDF*',
  '*.jpeg*',
  '*.jpg*',
  '*.png*',
  '*.gif*'
],
exclude_matches: [
  '*://*.googleusercontent.com/viewer/secure/pdf/*',
  '*://*.cdn.mozilla.net/*',
  '*://*.accounts.firefox.com/*',
  '*://*.addons.mozilla.org/*',
  '*://*.input.mozilla.org/*',
  '*://*.install.mozilla.org/*',
  '*://*.support.mozilla.org/*',
  '*://*.services.mozilla.org/*',
  '*://*.testpilot.firefox.com/*'
],
```
> You can find an up to date list in the  [`manifest/base.js`](../manifest/base.js) file.

Some of these rules cames from the [list provided by Firefox](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Content_scripts) 
and were also added to the `chrom*` version of the extension.
Thus, URLs excluded from Firefox are also excluded from `chrom*` to provide a consistent user experience across browsers.

### Hard coded exclude list
We maintain a list of excluded patterns in the code.
It is maintained irregularly and, some of these patterns might end up in the manifest file.
> We might as well remove this list in the future as most of these patterns can already be blocked in the manifest. 
> This might be legacy and related to PDFs related issues we had in the past.
```
const forbiddenTabs: RegExp[] = [
  /^about:.*/,
  /.*\.pdf$/i,
  /.*\.jpeg$/i,
  /.*\.jpg$/i,
  /.*\.png$/i,
  /.*\.gif$/i,
  /^chrome:.*/,
  /.*accounts-static\.cdn\.mozilla\.net.*/,
  /.*accounts\.firefox\.com.*/,
  /.*addons\.cdn\.mozilla\.net.*/,
  /.*addons\.mozilla\.org.*/,
  /.*api\.accounts\.firefox\.com.*/,
  /.*content\.cdn\.mozilla\.net.*/,
  /.*content\.cdn\.mozilla\.net.*/,
  /.*discovery\.addons\.mozilla\.org.*/,
  /.*input\.mozilla\.org.*/,
  /.*install\.mozilla\.org.*/,
  /.*oauth\.accounts\.firefox\.com.*/,
  /.*profile\.accounts\.firefox\.com.*/,
  /.*support\.mozilla\.org.*/,
  /.*sync\.services\.mozilla\.com.*/,
  /.*testpilot\.firefox\.com.*/
];
```
> You can find an up to date list in the [`src/webext/forbiddenTabs.ts`](../src/webext/forbiddenTabs.ts) file.

### Restricted contexts
We also maintain a dynamic list of *restricted contexts*, this list is __actively__ maintained.
These patterns are fetched from the backend and can be consulted here: 
http://notices.bulles.fr/api/v3/restricted-contexts

> In the near future we would like to set up a user's maintained list as well.

## User excluded context
User can completely disable an extension in private navigation.
