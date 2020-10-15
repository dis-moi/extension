import { useState, useEffect } from 'react';
import { StatefulContributor } from 'app/lmem/contributor';
import { TOUS } from 'components/molecules/Filters/RadiosFilters';

function useContributorsRadiosFilters(
  contributors: StatefulContributor[]
): [StatefulContributor[], (value: string) => void] {
  const [filteredContributors, setFilteredContributors] = useState<
    StatefulContributor[]
  >(contributors);
  const [selectedCategory, setSelectedCategory] = useState<string>();
  useEffect(() => {
    if (selectedCategory && selectedCategory !== TOUS) {
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
