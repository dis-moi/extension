// The reference is the deployed code (7e7a013), not the local repository:
// that one carries five undeployed commits, one of which changes this
// format.

// preg_quote of PHP 7.4. The slash is not in it: of the 3,885 served domain
// groups, 88 carry a bare one and none is escaped.
const SPECIAUX = '.\\+*?[^]$(){}=!<>|:-#';

export const pregQuote = (input: string): string => {
  let sortie = '';
  for (const caractere of input) {
    if (caractere === '\0') sortie += '\\000';
    else if (SPECIAUX.includes(caractere)) sortie += `\\${caractere}`;
    else sortie += caractere;
  }
  return sortie;
};

export interface DomainName {
  readonly name: string;
  readonly path: string | null;
  readonly aliases: ReadonlyArray<string>;
}

export interface DomainsSet {
  readonly domains: ReadonlyArray<DomainName>;
}

export interface DomainAttachments {
  readonly domainsSets: ReadonlyArray<DomainsSet>;
  readonly domainNames: ReadonlyArray<DomainName>;
}

const fullName = (domaine: DomainName): string =>
  domaine.name + (domaine.path ?? '');

// An empty simple_array gives [''], and an empty alternative in the pattern
// accepts every address.
const aliases = (domaine: DomainName): ReadonlyArray<string> =>
  domaine.aliases.filter((alias) => alias !== '');

// getAllRelatedDomains(): sets first, then direct domains, each followed by
// its aliases. array_unique compares by getFullName(), so two paths on one
// domain stay two entries.
export const relatedDomains = (
  attachements: DomainAttachments,
): ReadonlyArray<string> => {
  const domaines = [
    ...attachements.domainsSets.flatMap((jeu) => jeu.domains),
    ...attachements.domainNames,
  ];

  const vus = new Set<string>();
  const sortie: string[] = [];

  for (const domaine of domaines) {
    const complet = fullName(domaine);
    if (vus.has(complet)) continue;
    vus.add(complet);
    sortie.push(complet, ...aliases(domaine));
  }

  return sortie;
};

export const fullUrlRegex = (
  attachements: DomainAttachments,
  urlRegex: string,
): string => {
  const domaines = relatedDomains(attachements);

  return domaines.length === 0
    ? urlRegex
    : `(${domaines.map(pregQuote).join('|')})${urlRegex}`;
};

// The original uses && then ??, which treat the empty string differently:
// an empty exclusion on the context therefore masks the one of the notice.
export const completeExcludeUrlRegex = (
  exclusionDuContexte: string | null,
  exclusionDeLaNotice: string | null,
): string | null => {
  if (
    exclusionDuContexte !== null &&
    exclusionDuContexte !== '' &&
    exclusionDeLaNotice !== null &&
    exclusionDeLaNotice !== ''
  ) {
    return `(${exclusionDuContexte}|${exclusionDeLaNotice})`;
  }

  return exclusionDuContexte ?? exclusionDeLaNotice;
};
