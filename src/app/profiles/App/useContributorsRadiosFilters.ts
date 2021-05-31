import { useState, useEffect } from 'react';
import { StatefulContributor } from 'libs/lmem/contributor';
import { ALL } from 'components/molecules/Filters/RadiosFilters';

function useContributorsRadiosFilters(
  contributors: StatefulContributor[]
): [StatefulContributor[], (value: string) => void] {
  const [filteredContributors, setFilteredContributors] = useState<
    StatefulContributor[]
  >(contributors);
  const [selectedCategory, setSelectedCategory] = useState<string>();
  useEffect(() => {
    if (selectedCategory && selectedCategory !== ALL) {
      setFilteredContributors(
        contributors.filter(({ categories: contributorCategories }) =>
          contributorCategories.some(cc => selectedCategory === cc)
        )
      );
    } else {
      setFilteredContributors(contributors);
    }
  }, [selectedCategory, contributors]);

  return [filteredContributors, setSelectedCategory];
}

export default useContributorsRadiosFilters;
