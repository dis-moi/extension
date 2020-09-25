import { useState, useEffect } from 'react';
import { StatefulContributor } from 'app/lmem/contributor';
import { Categories } from 'app/lmem/category';

const distinct = (value: string, index: number, array: string[]) =>
  array.indexOf(value) === index;

function useContributorsFilters(
  contributors: StatefulContributor[],
  categories: Categories
): [StatefulContributor[], (value: string) => void, (value: string) => void] {
  const [filteredContributors, setFilteredContributors] = useState<
    StatefulContributor[]
  >(contributors);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  useEffect(() => {
    if (
      selectedCategories.length > 0 &&
      selectedCategories.length < Object.keys(categories).length
    ) {
      setFilteredContributors(
        contributors.filter(({ categories: contributorCategories }) =>
          contributorCategories.some(
            cc => selectedCategories.indexOf(cc) !== -1
          )
        )
      );
    } else {
      setFilteredContributors(contributors);
    }
  }, [selectedCategories, contributors]);

  const addFilter = (value: string): void =>
    setSelectedCategories(selectedCategories.concat(value).filter(distinct));
  const removeFilter = (value: string): void =>
    setSelectedCategories(
      selectedCategories.filter(category => category !== value)
    );

  return [filteredContributors, addFilter, removeFilter];
}

export default useContributorsFilters;
