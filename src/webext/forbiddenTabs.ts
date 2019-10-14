const forbiddenTabs = [
  /^about:.*/,
  /.*\.pdf$/i,
  /.*\.jpeg$/i,
  /.*\.jpg$/i,
  /.*\.png$/i,
  /.*\.gif$/i,
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

export default forbiddenTabs;
