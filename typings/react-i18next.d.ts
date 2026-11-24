import type { ReactNode } from 'react';

// react-i18next 11 declares I18nextProvider as a FunctionComponent without
// children, which only worked while @types/react declared children
// implicitly. React 18 removed that, so the prop has to be stated. Dropping
// this file is the signal that the dependency has moved to v12 or later,
// where the upstream types carry children themselves.
declare module 'react-i18next' {
  interface I18nextProviderProps {
    children?: ReactNode;
  }
}
