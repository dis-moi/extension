// The reference is the deployed code (7e7a013), not the local repository:
// that one carries five undeployed commits, one of which changes this
// format.

// preg_quote of PHP 7.4. The slash is not in it: of the 3,885 served domain
// groups, 88 carry a bare one and none is escaped.
const SPECIAL_CHARACTER = /[\0.\\+*?[\^\]$(){}=!<>|:#-]/g;

export const pregQuote = (input: string): string =>
  input.replace(SPECIAL_CHARACTER, (character) =>
    character === '\0' ? '\\000' : `\\${character}`,
  );

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

const fullName = (domain: DomainName): string =>
  domain.name + (domain.path ?? '');

// An empty simple_array gives [''], and an empty alternative in the pattern
// accepts every address.
const aliases = (domain: DomainName): ReadonlyArray<string> =>
  domain.aliases.filter((alias) => alias !== '');

// getAllRelatedDomains(): sets first, then direct domains, each followed by
// its aliases. array_unique compares by getFullName(), so two paths on one
// domain stay two entries.
export const relatedDomains = (
  attachments: DomainAttachments,
): ReadonlyArray<string> => {
  const domains = [
    ...attachments.domainsSets.flatMap((set) => set.domains),
    ...attachments.domainNames,
  ];

  const seen = new Set<string>();
  const related: string[] = [];

  for (const domain of domains) {
    const full = fullName(domain);
    if (seen.has(full)) continue;
    seen.add(full);
    related.push(full, ...aliases(domain));
  }

  return related;
};

export const fullUrlRegex = (
  attachments: DomainAttachments,
  urlRegex: string,
): string => {
  const domains = relatedDomains(attachments);

  return domains.length === 0
    ? urlRegex
    : `(${domains.map(pregQuote).join('|')})${urlRegex}`;
};

// The original uses && then ??, which treat the empty string differently:
// an empty exclusion on the context therefore masks the one of the notice.
export const completeExcludeUrlRegex = (
  contextExclusion: string | null,
  noticeExclusion: string | null,
): string | null => {
  if (
    contextExclusion !== null &&
    contextExclusion !== '' &&
    noticeExclusion !== null &&
    noticeExclusion !== ''
  ) {
    return `(${contextExclusion}|${noticeExclusion})`;
  }

  return contextExclusion ?? noticeExclusion;
};
