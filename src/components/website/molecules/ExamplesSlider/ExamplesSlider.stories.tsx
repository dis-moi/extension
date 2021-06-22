import React from 'react';
import ExamplesSlider, {
  examples,
  ExamplesSliderProps
} from './ExamplesSlider';

export default {
  title: 'Website/Molecules',
  argTypes: {
    examples: {
      control: { type: 'object' }
    }
  }
};

export const _ExamplesSlider = (args: ExamplesSliderProps) => (
  <ExamplesSlider {...args} />
);
_ExamplesSlider.args = {
  examples: examples
};
