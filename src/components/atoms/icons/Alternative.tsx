import React from 'react';
import { withTheme } from 'styled-components';
import { Theme } from 'app/theme';

interface Props {
  filled?: boolean;
  theme: Theme;
}

const Alternative = ({ filled, theme }: Props) => {
  const fill = filled ? theme.secondaryColor : '#fff';

  return (
    <svg width="27.432" height="20.971" viewBox="0 0 27 21">
      <path
        fill={fill}
        d="M27.309 5.88L21.676.247a.655.655 0 0 0-.736-.122.737.737 0 0 0-.427.613v3.579a8.672 8.672 0 0 0-6.8
       3.329A8.672 8.672 0 0 0 6.978 4.32V.678a.608.608 0 0 0-.43-.613.644.644 0 0 0-.732.122L.18 5.82a.751.751
       0 0 0 0 .98l5.636 5.632a.647.647 0 0 0 .732.122.739.739 0 0 0 .43-.612V8.763a4.731 4.731 0 0 1 4.645
       4.395c0 .106.007.207.007.317v7.5h4.165v-7.5-.15a4.731 4.731 0 0 1 4.649-4.562v3.181a.612.612 0 0 0
       .43.612.647.647 0 0 0 .732-.122l5.636-5.632a.7.7 0 0 0 .182-.491.518.518 0 0 0-.115-.431z"
      />
    </svg>
  );
};

export default withTheme(Alternative);
