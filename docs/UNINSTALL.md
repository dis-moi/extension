# Uninstall

Uninstall is handle by the browser natively.

When the extension is **uninstall** we trigger a redirection to the `UNINSTALL_ORIGIN` URL via the `setUninstallURL` hook:
```js
// [...]
browser.runtime.setUninstallURL(
  `${UNINSTALL_ORIGIN}${buildQueryString({ extensionId })}`
)
// [...]
```
Here we can add metrics to better understand the reason.

> The `UNINSTALL_ORIGIN` shall remain on the editor domain to better reflect content policy and manifest file.

At present time we use the following script on the uninstall page to forward parameters to our uninstall form URL:  
```s
<script>
(function(){
var 
  u = new URL(window.location.href), 
  ru = new URL('https://form.jotformeu.com/92173584558367')
;
ru.search = u.search;
window.location = ru.toString();
})()
</script> 
```
