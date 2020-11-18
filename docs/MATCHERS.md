# Matchers

We use elements of our [matchingContext](../src/app/lmem/matchingContext.ts) model to match elements of a tab :
- URL
- Content

> The `PageStateMatcher` model is very complete and could be used to replace our `matchingContext` model.
> Event if the `declarativeContent` API is not compatible with all our use cases, the data model is pertinent.

## Tab URL
Tab URL is matched against a regexp (see `urlRegex`) and another regexp is used to exclude some URLs ( see `excludeUrlRegex`).
> Both regexp could be brought together with one big regexp:
> ```
> ^(?=.*REGEX)(?=^(?:(?!EXCLUDE_REGEX).)*$).*$`
>```

## Page content

### CSS solution
CSS solution is very interesting because it could be compatible with `chrom*` `declarativeContent` API.

One limitation though is, we can't match page __content__ but only the document structure/presentation.

### XPath Solution
Xpath syntax isn't compatible with the `PageStateMatcher` solution but can match a page's content.
Content matching is very powerful and can detect many patterns we couldn't detect otherwise.

For example:
- Western Union frauds
- ...

For example to match a page containing the string *Dismoi* we could use the following expression:
```
//text()[contains(.,'Dismoi')
```

### Or both?
CSS solution could requires less permissions and could be used as fallback with an **optionnal** permission system.
A better UX (with `xpath`) would come with an additional permission cost.

## Content script API

### Execute script
This method requires the `tabs` permission. 
With only `activeTab` permission the `executeScript` method is restricted as long with didn't click the `browserAction`.

```ts
export const doesDocumentMatchExpression = (expression: string) => () =>
  document.evaluate(expression, document, null, XPathResult.BOOLEAN_TYPE, null);

export const doesTabContentMatchExpression = async (tab: Tab, expression) =>
  browser.tabs.executeScript(tab.id, {
    code: '(' + doesDocumentMatchXPath(expression) + ')();'
  });
```

### Message
For the above reasons we use the `browser.tabs.sendMessage` API instead.
