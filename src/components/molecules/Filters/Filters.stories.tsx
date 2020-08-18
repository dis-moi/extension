import React from 'react';
import { storiesOf } from '@storybook/react';
import FiltersSelect from '../Filters/FiltersSelect';
import FiltersCheckboxes from '../Filters/FiltersCheckboxes';

storiesOf('Components/Molecules/Filters', module)
  .add('Select', () => <FiltersSelect />)
  .add('Checkboxes', () => <FiltersCheckboxes />);
