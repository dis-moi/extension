import { StatefulContributor } from '../domain/contributor';

const getSearch = (
  value: string,
  contributors: StatefulContributor[]
): StatefulContributor[] => {
  const normalizeText = (string: string) =>
    string
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toUpperCase();

  const regex = new RegExp(
    value
      .split(' ')
      .map(val => normalizeText(val).replace(/.+/g, '(?=.*$&)'))
      .join(''),
    'g'
  );

  let filteredContributor = contributors.filter(contrib => {
    const toTest = contrib.name + ' ' + contrib.intro;
    return regex.test(normalizeText(toTest));
  });
  filteredContributor = value === '' ? contributors : filteredContributor;
  return filteredContributor;
};

export default getSearch;
