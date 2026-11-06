'use client';

import React, { useState } from 'react';
import { useServerInsertedHTML } from 'next/navigation';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';

/**
 * Collecte les règles produites pendant le rendu serveur et les injecte dans
 * le `<head>` avant le contenu qui s'en sert, sinon la page apparaît un
 * instant sans style.
 *
 * @see https://nextjs.org/docs/app/guides/css-in-js
 */
export default function StyledComponentsRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  // Une seule feuille pour tout le rendu : l'initialisation paresseuse évite
  // d'en recréer une à chaque passage.
  const [styleSheet] = useState(() => new ServerStyleSheet());

  useServerInsertedHTML(() => {
    const styles = styleSheet.getStyleElement();
    styleSheet.instance.clearTag();

    return <>{styles}</>;
  });

  // Dans le navigateur, styled-components reprend la main tout seul.
  if (typeof window !== 'undefined') {
    return <>{children}</>;
  }

  return (
    <StyleSheetManager sheet={styleSheet.instance}>
      {children}
    </StyleSheetManager>
  );
}
