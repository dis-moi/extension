import React from 'react';
import Header from '../../molecules/Header/Header';
import CoverSection, { CoverSectionProps } from './CoverSection';

export default {
  title: 'Website/Organisms',
  decorators: [
    Story => (
      <div style={{ margin: '-1rem' }}>
        <Header />
        <Story />
      </div>
    )
  ]
};

export const _CoverSection = (args: CoverSectionProps) => (
  <CoverSection {...args} />
);
