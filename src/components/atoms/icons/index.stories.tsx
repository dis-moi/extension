import React from 'react';
import { storiesOf } from '@storybook/react';
import * as icons from './';

storiesOf('Components/Atoms', module).add('Icons', () => (
  <main
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))'
    }}
  >
    {Object.keys(icons).map(key => {
      // eslint-disable-next-line
      // @ts-ignore
      const Icon = icons[key];
      return <Icon key={key} />;
    })}
  </main>
));
