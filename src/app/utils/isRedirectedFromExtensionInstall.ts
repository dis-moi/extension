const REDIRECTED_PATH = 'pk_campaign=installed';

const isRedirectedFromExtensionInstall = window.location.search.includes(
  REDIRECTED_PATH
);
export default isRedirectedFromExtensionInstall;
