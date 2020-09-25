import React, { ChangeEvent } from 'react';
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
  cursor: pointer;
  &:not(:first-child) {
    margin-left: 30px;
  }

  [type='checkbox'] {
    margin-right: 10px;
  }
`;

const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  cursor: pointer;
`;

interface FiltersCheckboxesProps {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  filters: Record<string, string>;
  loading: boolean;
}

const FiltersCheckboxes = ({
  onChange,
  filters,
  loading
}: FiltersCheckboxesProps) => {
  return (
    <FiltersBar>
      <FiltersTitle>Filtrer par :</FiltersTitle>
      <FiltersList>
        {!loading &&
          Object.keys(filters).map(filterId => (
            <FiltersListItem key={filterId} htmlFor={filterId}>
              <Checkbox
                id={filterId}
                name="filters"
                value={filterId}
                onChange={onChange}
              />
              {filters[filterId]}
            </FiltersListItem>
          ))}
      </FiltersList>
    </FiltersBar>
  );
};

FiltersCheckboxes.defaultProps = {
  filters: []
};

export default FiltersCheckboxes;
