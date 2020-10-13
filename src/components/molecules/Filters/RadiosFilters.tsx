import React, { ChangeEvent } from 'react';
import styled from 'styled-components';
import { FiltersBar, FiltersList, FiltersListItem } from './FiltersCheckboxes';

export const TOUS = 'Tous';

const RadioButton = styled.input.attrs({ type: 'radio' })`
  cursor: pointer;
`;

interface RadiosCheckboxesProps {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  filters: Record<number | string, string>;
  loading: boolean;
}

const RadiosFilters = ({
  onChange,
  filters,
  loading
}: RadiosCheckboxesProps) => {
  return (
    <FiltersBar>
      <FiltersList>
        <FiltersListItem key={TOUS} htmlFor={TOUS}>
          <RadioButton
            id={TOUS}
            name="filters"
            value={TOUS}
            onChange={onChange}
            defaultChecked
          />
          {TOUS}
        </FiltersListItem>
        {!loading &&
          Object.keys(filters).map(filterId => (
            <FiltersListItem key={filterId} htmlFor={filterId}>
              <RadioButton
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

RadiosFilters.defaultProps = {
  filters: []
};

export default RadiosFilters;
