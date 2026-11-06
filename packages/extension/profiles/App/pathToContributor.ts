import slugify from 'slugify';
import join from 'join-url';
import { Contributor } from '@dismoi/domain/contributor';

/**
 * L'adresse de la page d'un contributeur, sous celle de la liste.
 *
 * `listPath` — « /fr/profils » ou « /en/guides » — est donné par celui qui
 * affiche le lien, qui le tient de sa propre instance d'i18next. Il était
 * auparavant lu sur le singleton global ; le site en crée désormais une
 * instance par rendu et n'initialise plus ce singleton, dont le `t()` rendait
 * alors `undefined`. Le chemin sortait relatif, react-router le résolvait
 * contre la page courante — « /fr/42/Nom » au lieu de
 * « /fr/profils/42/Nom » — et chaque lien de la liste menait à une 404.
 */
const pathToContributor = (contributor: Contributor, listPath: string) =>
  join.pathname(listPath, contributor.id, slugify(contributor.name));

export default pathToContributor;
