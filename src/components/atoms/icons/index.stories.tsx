import React from 'react';
import * as icons from './';

export default {
  title: 'Components/Atoms/Icons'
};

export const Icons = () => (
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
);
