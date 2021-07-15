import React, { useState, useEffect } from 'react';
import { StatefulContributor } from 'libs/domain/contributor';
import getSearchResults from 'libs/utils/getSearchResults';
import { ALL } from 'components/molecules/Filters/RadiosFilters';

function useContributorsFilters(
  contributors: StatefulContributor[]
): [
  StatefulContributor[],
  (value: string) => void,
  (e: React.ChangeEvent<HTMLInputElement>) => void
] {
  const [filteredContributors, setFilteredContributors] = useState<{
    base: StatefulContributor[];
    filtered: StatefulContributor[];
  }>({ base: contributors, filtered: contributors });

  const [selectedCategory, setSelectedCategory] = useState<string>();
  const catFilter = () =>
    contributors.filter(({ categories: contributorCategories }) =>
      contributorCategories.some(cc => selectedCategory === cc)
    );

  useEffect(() => {
    if (selectedCategory && selectedCategory !== ALL) {
      setFilteredContributors({
        filtered: catFilter(),
        base: catFilter()
      });
    } else {
      setFilteredContributors({ filtered: contributors, base: contributors });
    }
  }, [selectedCategory, contributors]);

  const handleChangeSearchContributors = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const foundContributors = getSearchResults(
      e.target.value,
      filteredContributors.base
    );
    return setFilteredContributors({
      ...filteredContributors,
      filtered: foundContributors
    });
  };

  return [
    filteredContributors.filtered,
    setSelectedCategory,
    handleChangeSearchContributors
  ];
}

export default useContributorsFilters;
