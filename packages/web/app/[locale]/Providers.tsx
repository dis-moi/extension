'use client';

import React, { ReactNode, useState } from 'react';
import { I18nextProvider } from 'react-i18next';
import { ThemeProvider } from 'styled-components';
import { createI18n, SupportedLanguage } from '@dismoi/i18n';
import { getTheme } from 'libs/facets/getTheme';
import StyledComponentsRegistry from '../StyledComponentsRegistry';

interface ProvidersProps {
  locale: SupportedLanguage;
  children: ReactNode;
}

/**
 * Le thème et la langue sont fixés dès le premier rendu, serveur compris :
 * la langue vient du chemin, que le serveur connaît, et le thème est une
 * constante. Rien ici ne dépend du navigateur, donc le HTML rendu des deux
 * côtés est le même.
 */
export default function Providers({ locale, children }: ProvidersProps) {
  const [i18n] = useState(() => createI18n(locale));

  return (
    <StyledComponentsRegistry>
      <I18nextProvider i18n={i18n}>
        <ThemeProvider theme={getTheme()}>{children}</ThemeProvider>
      </I18nextProvider>
    </StyledComponentsRegistry>
  );
}
