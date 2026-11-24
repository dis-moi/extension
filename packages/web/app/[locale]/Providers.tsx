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
 * The theme and the locale are settled from the first render, the server one
 * included: the locale comes from the path, which the server knows, and the
 * theme is a constant. Nothing here depends on the browser, so the HTML
 * rendered on both sides is the same.
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
