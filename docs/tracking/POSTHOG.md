# PostHog

**PostHog** tend to be our new tracking tool of reference,
mostly because it makes greater use of events compared to **Matomo**.

## Challenges

### Browser extension context

**PostHog** browser version doesn't work in our context since we're mostly tracking events
from the **background** script and **PostHog** make heavy use of the `document` and `window` property.

The **background** script is closer to a `WebWorker` context;
it will soon truly be a `WebWorker` to comply with new standards.

In the meantime we're using the node version of the PostHog library,
and add a few things here and there.

Notably all info gathered about the platform, browser and device types.

> More info about vendor specific **PostHog** fields:
>
> - https://raw.githubusercontent.com/PostHog/posthog-js/master/src/utils.js
> - https://github.com/PostHog/posthog/issues/1534#issuecomment-688566925
> - https://github.com/PostHog/posthog/blob/1.26.0/frontend/src/lib/components/PropertyKeyInfo.tsx
