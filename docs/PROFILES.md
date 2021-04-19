# Profiles pages

The `profiles` app is able to connect to extension via the [port communication API](https://developer.mozilla.org/fr/docs/Mozilla/Add-ons/WebExtensions/API/runtime/connect).
The extension manifest allow external connection and the `background` script listen external connection from the **profiles** app origin.

However, port communication isn't available from external pages in all browser.
When the `*.runtime.connect` method is not available (ex: Firefox) a fallback connection mechanism.
Using `window.postMessage` from profiles page, we connect to `content` script which act as a bridge between the `background` script and the `profiles` page.
This fallback is called the `bridgeConnection`:

- **Profiles** -`window.postMessage`-> **Content** -`port.postMessage`-> **Background**
- **Background** -`port.postMessage`-> **Content** -`window.postMessage`-> **Profiles**
> see `bridgeConnection.saga.ts`

> At the moment it works for Firefox, and has been designed to work within a page context where the `*.runtime.connect` method is not available,
so if by any chance it's implemented it would take the preferred port communication method.
BUT the alternative window communication method, is not foolproof,
a few cases might be solved but others edgy ones won't work as we rely on the content script.
So if the context is invalidated, it just breaks...



## Testing

### Firefox

> This is not easy to test on Firefox, in test mode the firefox extensionId is always changing.
> So we implement a little hack which requires the `FIREFOX_EXTENSION_ID=` to be empty in your `.env.development` file.

1. `yarn start:firefox`
2. `yarn start:profiles`

### Chrome

1. Load the development extension.
2. Take note of the `extensionId` something like the following `ebeinbdeoaflbdcbhhkpiccccgdpohki` and add it to your `.env.development` file :

```
CHROME_EXTENSION_ID=ebeinbdeoaflbdcbhhkpiccccgdpohki
```

3. You can now start both apps:

```
yarn start
yarn start:profiles
```

## Resources

- https://github.com/dis-moi/extension/pull/630
- https://github.com/dis-moi/extension/pull/642
- https://developer.mozilla.org/fr/docs/Mozilla/Add-ons/WebExtensions/API/runtime/onConnectExternal
