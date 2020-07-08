import React from 'react';
import styled from 'styled-components';

interface Props {
  active?: boolean;
}

const FiltersBar = styled.div`
  display: flex;
  align-items: center;
  padding: 0 20px;
  background-color: #fff;
  border-radius: 5px;
`;

const FiltersTitle = styled.span`
  font-size: 16px;
`;

const FiltersList = styled.ul`
  display: flex;
  margin: 0;
  padding-left: 40px;
  list-style-type: none;
`;

const FiltersListItem = styled.li`
  &:not(:first-child) {
    margin-left: 40px;
  }
`;

const FiltersButton = styled.button<Props>`
  padding: 10px;
  font-size: 16px;
  font-weight:bold;
  color: ${props => (props.active ? '#fff' : props.theme.textColor)};
  text-transform: none;
  text-decoration: none;
  background-color ${props =>
    props.active ? props.theme.Button.hover : '#fff'};
  border:none;
  border-radius: 0;
  cursor:pointer;

  &:hover {
    color: #fff;
    background-color: ${props => props.theme.Button.default};
  }
`;

const Filters = () => {
  return (
    <FiltersBar>
      <FiltersTitle>Filtrer par :</FiltersTitle>
      <FiltersList>
        <FiltersListItem>
          <FiltersButton active>Tous</FiltersButton>
        </FiltersListItem>
        <FiltersListItem>
          <FiltersButton>Conso</FiltersButton>
        </FiltersListItem>
        <FiltersListItem>
          <FiltersButton>Info & média</FiltersButton>
        </FiltersListItem>
        <FiltersListItem>
          <FiltersButton>Professionnel</FiltersButton>
        </FiltersListItem>
        <FiltersListItem>
          <FiltersButton>Militant</FiltersButton>
        </FiltersListItem>
        <FiltersListItem>
          <FiltersButton>Culture & loisir</FiltersButton>
        </FiltersListItem>
      </FiltersList>
    </FiltersBar>
  );
};

export default Filters;
