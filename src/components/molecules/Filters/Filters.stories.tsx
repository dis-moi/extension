import React from 'react';
import { storiesOf } from '@storybook/react';
import FiltersSelect from '../Filters/FiltersSelect';
import FiltersCheckboxes from '../Filters/FiltersCheckboxes';
import { action } from '@storybook/addon-actions';

const FILTERS = {
  CONSO: 'Conso',
  INFOS: 'Infos & média',
  PRO: 'Professionnel',
  MILITANT: 'Militant',
  CULTURE: 'Culture & Loisir'
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
  ));
