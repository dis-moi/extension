'use client';

import React, { useState } from 'react';
import { useServerInsertedHTML } from 'next/navigation';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';

/**
 * Collects the rules produced during the server render and injects them into
 * the `<head>` before the content that uses them, otherwise the page shows
 * unstyled for an instant.
 *
 * @see https://nextjs.org/docs/app/guides/css-in-js
 */
export default function StyledComponentsRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  // One sheet for the whole render: the lazy initialisation keeps it from
  // being rebuilt on every pass.
  const [styleSheet] = useState(() => new ServerStyleSheet());

  useServerInsertedHTML(() => {
    const styles = styleSheet.getStyleElement();
    styleSheet.instance.clearTag();

    return <>{styles}</>;
  });

  // In the browser, styled-components takes over on its own.
  if (typeof window !== 'undefined') {
    return <>{children}</>;
  }

  return (
    <StyleSheetManager sheet={styleSheet.instance}>
      {children}
    </StyleSheetManager>
  );
}
