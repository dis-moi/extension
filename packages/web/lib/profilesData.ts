import { Contributor } from '@dismoi/domain/contributor';
import { Categories } from '@dismoi/domain/category';
import { BACKEND_ORIGIN } from 'libs/api/constants/origins';

export interface ProfilesData {
  contributors: Contributor[];
  categories: Categories;
}

const fetchJson = async <T>(path: string, fallback: T): Promise<T> => {
  try {
    const response = await fetch(`${BACKEND_ORIGIN}${path}`, {
      // Les contributeurs et les catégories bougent peu ; une heure de cache
      // épargne autant d'allers-retours que de pages servies.
      next: { revalidate: 3600 },
    });

    return response.ok ? ((await response.json()) as T) : fallback;
  } catch {
    return fallback;
  }
};

/**
 * Les données publiques de la page des profils, lues sur le serveur.
 *
 * Elles suffisent à rendre la liste complète : seuls les abonnements de
 * l'internaute viennent de l'extension, et eux seuls restent invisibles au
 * serveur. C'est ce qui permet à la page d'exister pour un visiteur sans
 * extension — et pour un robot d'indexation.
 *
 * Un échec de l'API ne doit pas faire tomber la page : elle se rend alors
 * vide, et les sagas rattrapent le chargement dans le navigateur.
 */
export const fetchProfilesData = async (): Promise<ProfilesData> => {
  const [contributors, categories] = await Promise.all([
    fetchJson<Contributor[]>('contributors', []),
    fetchJson<Categories>('categories', {}),
  ]);

  return { contributors, categories };
};

/**
 * Le contributeur désigné par un chemin de la forme « 16/le-meme-en-mieux »,
 * pour que sa page porte son nom plutôt que celui de la liste.
 */
export const findContributorInPath = async (
  path: string[] | undefined,
): Promise<Contributor | null> => {
  const id = Number(path?.[0]);

  if (!Number.isInteger(id)) {
    return null;
  }

  const contributors = await fetchJson<Contributor[]>('contributors', []);

  return contributors.find((contributor) => contributor.id === id) ?? null;
};
