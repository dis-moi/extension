import React from 'react';
import { storiesOf } from '@storybook/react';
import FiltersSelect from '../Filters/FiltersSelect';
import FiltersCheckboxes from '../Filters/FiltersCheckboxes';
import { action } from '@storybook/addon-actions';
import RadiosFilters from './RadiosFilters';

const FILTERS = {
  INFOS: 'Tous',
  CONSO: 'Conso',
  MILITANT: 'Militant',
  CULTURE: 'Culture & Société'
  PRO: 'Divers',
};

const RADIO_FILTERS = {
  0: 'Tous',
  ...FILTERS
};

storiesOf('Components/Molecules/Filters', module)
  .add('Select', () => <FiltersSelect />)
  .add('Checkboxes', () => (
    <FiltersCheckboxes
      onChange={action('handleChange')}
      loading={false}
      filters={FILTERS}
    />
  ))
  .add('Checkboxes loading', () => (
    <FiltersCheckboxes
      onChange={action('handleChange')}
      loading={true}
      filters={FILTERS}
    />
  ))
  .add('Radios', () => (
    <RadiosFilters
      onChange={action('handleChange')}
      loading={false}
      filters={RADIO_FILTERS}
    />
  ))
  .add('Radios loading', () => (
    <RadiosFilters
      onChange={action('handleChange')}
      loading={true}
      filters={RADIO_FILTERS}
    />
  ));
