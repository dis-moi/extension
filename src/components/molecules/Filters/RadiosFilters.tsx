import React, { ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Radio } from '../../atoms/icons';
import { FiltersBar, FiltersList, FiltersListItem } from './FiltersCheckboxes';

export const ALL = 'all';

const RadioButton = styled.input.attrs({ type: 'radio' })`
  cursor: pointer;
  position: absolute;
  width: 14px;
  height: 14px;
  opacity: 0;

 &:checked + svg {
  .radio-checked {
    fill: ${props => props.theme.colorPrimary};
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
  const { t } = useTranslation('profiles');
  return (
    <FiltersBar>
      <FiltersList>
        <FiltersListItem key={ALL} htmlFor={ALL}>
          <RadioButton
            id={ALL}
            name="filters"
            value={ALL}
            onChange={onChange}
            defaultChecked
          />
          <Radio />
          {t('common.' + ALL)}
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
