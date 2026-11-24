import { Contributor } from '@dismoi/domain/contributor';
import { Categories } from '@dismoi/domain/category';
import { BACKEND_ORIGIN } from 'libs/api/constants/origins';

export interface ProfilesData {
  contributors: Contributor[];
  categories: Categories;
}

// A guard at the boundary: an error page served as 200, a truncated answer
// or a change of contract would bring the server rendering down.
const fetchCollection = async <T>(
  path: string,
  fallback: T,
  estValide: (value: unknown) => boolean,
): Promise<T> => {
  try {
    const response = await fetch(`${BACKEND_ORIGIN}${path}`, {
      // Contributors and categories move little; an hour of cache saves as
      // many round trips as there are pages served.
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      return fallback;
    }

    const body: unknown = await response.json();

    return estValide(body) ? (body as T) : fallback;
  } catch {
    return fallback;
  }
};

const estTableau = (value: unknown): boolean => Array.isArray(value);

const estObjet = (value: unknown): boolean =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

// Only the reader's own subscriptions come from the extension: everything
// else renders on the server, which makes the page exist for a visitor
// without the extension and for a crawler.
export const fetchProfilesData = async (): Promise<ProfilesData> => {
  const [contributors, categories] = await Promise.all([
    fetchCollection<Contributor[]>('contributors', [], estTableau),
    fetchCollection<Categories>('categories', {}, estObjet),
  ]);

  return { contributors, categories };
};

export const findContributorInPath = async (
  path: string[] | undefined,
): Promise<Contributor | null> => {
  const id = Number(path?.[0]);

  if (!Number.isInteger(id)) {
    return null;
  }

  // Next issues a single request: identical `fetch` calls within one render
  // are memoised, so this one and the page's are the same.
  const contributors = await fetchCollection<Contributor[]>(
    'contributors',
    [],
    estTableau,
  );

  return contributors.find((contributor) => contributor.id === id) ?? null;
};
