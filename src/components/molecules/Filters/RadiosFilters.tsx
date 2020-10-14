import React, { ChangeEvent } from 'react';
import styled from 'styled-components';
import { FiltersBar, FiltersList, FiltersListItem } from './FiltersCheckboxes';
import { Radio } from '../../atoms/icons';

export const TOUS = 'Tous';

const RadioButton = styled.input.attrs({ type: 'radio' })`
  cursor: pointer;
  position: absolute;
  width: 14px;
  height: 14px;
  opacity: 0;
  
 &:checked + svg {
  .radio-checked {
    fill: ${props => props.theme.activeColor};
  }
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
          <Radio />
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
              <Radio />
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
