import React from 'react';
import { withTheme } from 'styled-components';
import { Theme } from 'app/theme';

interface Props {
  stroked?: boolean;
  theme: Theme;
}
const Other = ({ stroked, theme }: Props) => {
  const stroke = stroked ? theme.secondaryColor : '#fff';

  return (
    <svg width="28.809" height="28.809" viewBox="0 0 28.809 28.809">
      <path
        fill="none"
        stroke={stroke}
        strokeWidth="2px"
        strokeDasharray="8 2"
        d="M22.883,3.926A13.4,13.4,0,0,0,3.926,22.883,13.4,13.4,0,0,0,22.883,3.926Z"
        transform="translate(1 1)"
      />
    </svg>
  );
};

export default withTheme(Other);
