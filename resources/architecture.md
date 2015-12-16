
The current application is based on https://github.com/zalmoxisus/browser-redux.
You can learn more about redux on this article : https://medium.com/@Lilobase/the-just-enough-redux-reading-list-74c954e1941

## Initialization

The main initialization points are located in `/src/browser/extension`.

Specific listeners are registered from `src/app/listener`:
  - the `webRequest` listener which register the matching url action.

The browser specifics API are virtualized through the `vAPI` localized in the `src/vapi` which are injected in the listeners.

## Architecture & main concepts

The extension moves offers to alternatives

States are stored in the `/src/app/reducers` :
  - Offers contains static offers
  - Alternatives contains matching offers for the current browsing context

## Flow

The initial flow is handled by a series of actions (stored in `/src/actions`) :
  - when the webRequest listener handle a request, it call the `browsing/webRequestLaunched` which call the `alternatives/findAlternatives`.
  The `webRequestLaunched` action has been added for a better domain representation (decoupling) and to be able to respond with more actions in the future.
  - the `findAlternatives` action search for matching alternatives in offers, if a matching offer is found it call the `alternatives/alternativeFound` action.

Then we have an injector which listen to the `alternatives` states.