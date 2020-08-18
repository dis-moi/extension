import React from 'react';
import styled from 'styled-components';

const FiltersBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 14px 20px;
  background-color: #fff;
  border-radius: 5px;
`;

const FiltersTitle = styled.span`
  font-size: 16px;
`;

const FiltersList = styled.div`
  display: flex;
  margin-left: 18px;
  padding-left: 10px;
  font-size: 16px;
  color: ${props => props.theme.textColor};
  border-radius: ${props => props.theme.Button.radius};
`;

const FiltersListItem = styled.label`
  &:not(:first-child) {
    margin-left: 30px;
  }

  [type='checkbox'] {
    margin-right: 10px;
  }
`;

const FiltersCheckboxes = () => {
  return (
    <FiltersBar>
      <FiltersTitle>Filtrer par :</FiltersTitle>
      <FiltersList>
        <FiltersListItem>
          <input type="checkbox" name="filters" />
          Conso
        </FiltersListItem>
        <FiltersListItem>
          <input type="checkbox" name="filters" />
          Info & média
        </FiltersListItem>
        <FiltersListItem>
          <input type="checkbox" name="filters" />
          Professionnel
        </FiltersListItem>
        <FiltersListItem>
          <input type="checkbox" name="filters" />
          Militant
        </FiltersListItem>
        <FiltersListItem>
          <input type="checkbox" name="filters" />
          Culture & loisir
        </FiltersListItem>
      </FiltersList>
    </FiltersBar>
  );
};

export default FiltersCheckboxes;
