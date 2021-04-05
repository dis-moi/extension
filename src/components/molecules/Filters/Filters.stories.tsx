import React from 'react';
import FiltersSelect from '../Filters/FiltersSelect';
import FiltersCheckboxes from '../Filters/FiltersCheckboxes';
import { action } from '@storybook/addon-actions';
import RadiosFilters from './RadiosFilters';

const FILTERS = {
  CONSO: 'Conso',
  MILITANT: 'Militant',
  CULTURE: 'Culture & Société',
  DIVERS: 'Divers'
};

const RADIO_FILTERS = {
  0: 'Tous',
  ...FILTERS
};

export default {
  title: 'Components/Molecules/Filters'
};

export const Select = () => <FiltersSelect />;

export const Checkboxes = () => (
  <FiltersCheckboxes
    onChange={action('handleChange')}
    loading={false}
    filters={FILTERS}
  />
);

export const CheckboxesLoading = () => (
  <FiltersCheckboxes
    onChange={action('handleChange')}
    loading={true}
    filters={FILTERS}
  />
);

CheckboxesLoading.story = {
  name: 'Checkboxes loading'
};

export const Radios = () => (
  <RadiosFilters
    onChange={action('handleChange')}
    loading={false}
    filters={RADIO_FILTERS}
  />
);

export const RadiosLoading = () => (
  <RadiosFilters
    onChange={action('handleChange')}
    loading={true}
    filters={RADIO_FILTERS}
  />
);

RadiosLoading.story = {
  name: 'Radios loading'
};
