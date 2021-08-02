export const isChromePDFViewer = (contentDocument: Document) =>
  !!contentDocument.querySelector('embed[type="application/pdf"]');

export const isFirefoxPDFViewer = (contentDocument: Document) =>
  contentDocument.baseURI.indexOf('resource://pdf.js') === 0;

/**
 * For inspirations
 * @see https://github.com/hypothesis/browser-extension/blob/a95409f8422297592871af9c42a6bc3974528f94/src/common/detect-content-type.js#L29
 */
export default (contentDocument: Document) =>
  [isChromePDFViewer, isFirefoxPDFViewer].some(isPDFViewerFunction =>
    isPDFViewerFunction(contentDocument)
  );
