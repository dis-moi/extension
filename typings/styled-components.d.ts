import 'styled-components';

import { Theme } from 'libs/facets/theme';

/**
 * styled-components v6 fournit ses propres types et attend que le thème du
 * projet soit déclaré par augmentation de `DefaultTheme`. C'est ce qui rend
 * `props.theme.activeColor` vérifiable dans tous les composants, là où la v5
 * passait par un module de réexport typé à la main
 * (`packages/extension/types/styled-components.ts`, supprimé).
 *
 * Ce fichier est listé dans le `include` de chaque projet qui écrit du style,
 * faute de quoi l'augmentation ne vaudrait que pour le paquet qui le contient.
 */
declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
