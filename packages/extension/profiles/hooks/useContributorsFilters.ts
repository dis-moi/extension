import React, { useState } from 'react';
import { StatefulContributor } from '@dismoi/domain/contributor';
import getSearchResults from 'libs/utils/getSearchResults';
import { ALL } from '@dismoi/ui/molecules/Filters/RadiosFilters';

const inCategory =
  (category: string) =>
  ({ categories }: StatefulContributor) =>
    categories.some((contributorCategory) => contributorCategory === category);

interface Criteria {
  category?: string;
  search: string;
}

const filterContributors = (
  contributors: StatefulContributor[],
  { category, search }: Criteria,
): StatefulContributor[] =>
  getSearchResults(
    search,
    category ? contributors.filter(inCategory(category)) : contributors,
  );

export interface ContributorsFilters {
  filteredContributors: StatefulContributor[];
  setFilter: (category: string) => void;
  handleChangeSearchContributors: (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => void;
}

/**
 * Applique les filtres de la page (catégorie, recherche) à la liste de
 * contributeurs qu'on lui passe.
 *
 * Seuls les critères de filtrage sont conservés en état local : la liste,
 * elle, est recalculée à chaque rendu. La recopier dans un `useState`
 * figeait la première version reçue, et les abonnements — qui arrivent de
 * l'extension après les contributeurs, venus de l'API — n'apparaissaient
 * jamais.
 */
function useContributorsFilters(
  contributors: StatefulContributor[],
): ContributorsFilters {
  const [category, setCategory] = useState<string>();
  const [search, setSearch] = useState('');

  return {
    filteredContributors: filterContributors(contributors, {
      category,
      search,
    }),
    // `ALL` est la valeur que le groupe de boutons radio donne à « toutes
    // les catégories » : elle ne filtre rien.
    setFilter: (selected: string) =>
      setCategory(selected === ALL ? undefined : selected),
    handleChangeSearchContributors: (e) => setSearch(e.target.value),
  };
}

export default useContributorsFilters;
