import { StatefulContributor } from '../domain/contributor';

const unaccent = (string: string) =>
  string.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

const getSearchResults = (
  search: string,
  contributors: StatefulContributor[]
): StatefulContributor[] => {
  if (!search) return contributors;

  const regex = new RegExp(
    search
      .split(' ')
      .map(val => unaccent(val).replace(/.+/g, '(?=.*$&)'))
      .join(''),
    'gi'
  );

  return contributors.filter(({ name, intro }) =>
    regex.test(unaccent(`${name} ${intro}`))
  );
};

export default getSearchResults;
