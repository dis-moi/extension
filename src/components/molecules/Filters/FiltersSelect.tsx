import React from 'react';
import styled from 'styled-components';

interface Props {
  active?: boolean;
}

const FiltersBar = styled.div`
  display: flex;
  align-items: center;
  padding: 0 20px;
`;

const FiltersTitle = styled.span`
  font-size: 16px;
`;

const FiltersList = styled.select`
  display: flex;
  height: 30px;
  margin: 0;
  margin-left: 18px;
  padding-left: 10px;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  background-color: ${props => props.theme.Button.default};
  border-radius: ${props => props.theme.Button.radius};
`;

const FiltersListItem = styled.option`
  &:not(:first-child) {
    margin-left: 40px;
  }
`;

const FiltersSelect = () => {
  return (
    <FiltersBar>
      <FiltersTitle>Filtrer par :</FiltersTitle>
      <FiltersList>
        <FiltersListItem>Tous</FiltersListItem>
        <FiltersListItem>Conso</FiltersListItem>
        <FiltersListItem>Culture & Société</FiltersListItem>
        <FiltersListItem>Miltant</FiltersListItem>
        <FiltersListItem>Divers</FiltersListItem>
      </FiltersList>
    </FiltersBar>
  );
};

export default FiltersSelect;
