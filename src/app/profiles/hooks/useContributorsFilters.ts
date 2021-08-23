import React, { useState, useEffect } from 'react';
import { ContributorId, StatefulContributor } from 'libs/domain/contributor';
import getSearchResults from 'libs/utils/getSearchResults';
import { ALL } from 'components/molecules/Filters/RadiosFilters';

function useContributorsFilters(
  contributors: StatefulContributor[]
): [
  StatefulContributor[],
  (value: string) => void,
  (e: React.ChangeEvent<HTMLInputElement>) => void,
  (id: ContributorId, subscribed: boolean) => void
] {
  const [filteredContributors, setFilteredContributors] = useState<{
    all: StatefulContributor[];
    filtered: StatefulContributor[];
  }>({ all: contributors, filtered: contributors });

  const [selectedCategory, setSelectedCategory] = useState<string>();

  const catFilter = (contributors: StatefulContributor[]) =>
    contributors.filter(({ categories: contributorCategories }) =>
      contributorCategories.some(cc => selectedCategory === cc)
    );

  useEffect(() => {
    if (selectedCategory && selectedCategory === ALL) {
      return setFilteredContributors({
        filtered: filteredContributors.all,
        all: filteredContributors.all
      });
    }

    return setFilteredContributors({
      ...filteredContributors,
      filtered: catFilter(filteredContributors.all)
    });
  }, [selectedCategory]);

  useEffect(() => {
    if (filteredContributors.all.length === 0)
      return setFilteredContributors({
        filtered: contributors,
        all: contributors
      });
  }, [contributors]);

  const handleChangeSearchContributors = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    return setFilteredContributors({
      ...filteredContributors,
      filtered: getSearchResults(e.target.value, filteredContributors.all)
    });
  };

  const updateFilteredContributors = (
    contributorId: ContributorId,
    subscribed: boolean
  ) => {
    const getContrib = (contrib: StatefulContributor) => {
      if (contrib.id === contributorId) {
        return {
          ...contrib,
          subscribed,
          ratings: {
            subscribes: contrib.ratings.subscribes + (subscribed ? 1 : -1)
          }
        };
      }
      return contrib;
    };
    return setFilteredContributors({
      all: filteredContributors.all.map(getContrib),
      filtered: filteredContributors.filtered.map(getContrib)
    });
  };

  return [
    filteredContributors.filtered,
    setSelectedCategory,
    handleChangeSearchContributors,
    updateFilteredContributors
  ];
}

export default useContributorsFilters;
