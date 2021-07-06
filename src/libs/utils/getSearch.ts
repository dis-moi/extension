import { StatefulContributor } from '../domain/contributor';

const getSearch = (
  value: string,
  contributors: StatefulContributor[]
): StatefulContributor[] => {
  const regex = new RegExp(
    value
      .split(' ')
      .map(val => val.toUpperCase().replace(/.+/g, '(?=.*$&)'))
      .join(''),
    'g'
  );

  let filteredContributor = contributors.filter(contrib => {
    const toTest = contrib.name + ' ' + contrib.intro;
    return regex.test(toTest.toUpperCase());
  });
  filteredContributor = value === '' ? contributors : filteredContributor;
  return filteredContributor;
};

export default getSearch;
