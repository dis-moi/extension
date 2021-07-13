import React, { ChangeEvent } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Input, Select } from '../../atoms/Forms';
import { ALL } from '../Filters/RadiosFilters';
import { SearchIcon } from '../../atoms/icons';
import { trilean } from '../../../types';

const SearchBar = styled.div`
  display: flex;
  padding: 0 16px;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-bottom: -10px;
  & > * {
    margin-bottom: 10px;
  }

  select,
  input {
    font-size: 16px;
    box-shadow: none;
    border: none;
  }

  select {
    margin-right: 24px;
    margin-bottom: 0;
    padding: 10px 7px;
    text-transform: none;
  }

  input {
    margin-bottom: 0;
    padding: 10px 7px;
  }
`;

const SearchFilters = styled.div`
  display: flex;
  align-items: center;
  label {
    flex-shrink: 0;
    margin-right: 8px;
  }
`;

const SearchField = styled.div`
  display: flex;
  input {
    border-radius: 6px 0 0 6px;
  }
`;

const SearchIconContainer = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  background-color: white;
  border-radius: 0 6px 6px 0;

  svg {
    width: 20px;
    height: 20px;
    fill: ${props => props.theme.activeColor};
  }
`;

interface SearchProps {
  categoriesLoading: trilean;
  categories: Record<string, string>;
  setFilter: (value: string) => void;
  handleChangeSearchContributors: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

const Search = ({
  categoriesLoading,
  categories,
  setFilter,
  handleChangeSearchContributors
}: SearchProps) => {
  const { t } = useTranslation();
  const handleFiltersChange = ({
    target: { value }
  }: ChangeEvent<HTMLSelectElement>) => {
    setFilter(value);
  };

  return (
    <SearchBar>
      {!categoriesLoading && (
        <SearchFilters>
          <label htmlFor="categories">Filtrer par : </label>
          <Select
            onChange={handleFiltersChange}
            placeholder={'Filtrez la recherche'}
            id="categories"
          >
            <option value={ALL}>{t('profiles:common.all')}</option>
            {Object.keys(categories).map(catId => (
              <option key={catId} value={catId}>
                {categories[catId]}
              </option>
            ))}
          </Select>
        </SearchFilters>
      )}
      <SearchField>
        <Input
          type={'text'}
          placeholder={t('profiles:form.placeholder.search')}
          onChange={handleChangeSearchContributors}
        />
        <SearchIconContainer>
          <SearchIcon />
        </SearchIconContainer>
      </SearchField>
    </SearchBar>
  );
};

export default Search;
