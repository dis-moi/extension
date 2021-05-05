import React from 'react';
import { withTheme } from 'styled-components';
import { Index } from 'libs/theme';

interface Props {
  stroked?: boolean;
  filled?: boolean;
  theme: Index;
}
const ThumbUp = ({ filled, stroked, theme }: Props) => {
  const stroke = stroked ? theme.secondaryColor : undefined;
  const fill = filled ? theme.secondaryColor : '#fff';

  return (
    <svg width="20.254" height="19.444" viewBox="-1 -1 22.254 21.444">
      <path
        stroke={stroke}
        fill={fill}
        d="M.695 10.798a2.776 2.776 0 0 1-.7-1.886 2.463 2.463 0 0 1 2.429-2.431h3.511a2.831 2.831 0 0
      0-.1-.3 2.117 2.117 0 0 0-.14-.278c-.058-.1-.1-.177-.126-.228q-.229-.43-.348-.709a5.135 5.135 0 0
      1-.241-.76 3.938 3.938 0 0 1-.121-.962q0-.3.007-.493a5.311 5.311 0 0 1 .063-.57 3.179 3.179 0 0
      1 .148-.637 2.936 2.936 0 0 1 .3-.57 1.763 1.763 0 0 1 .506-.513 2.764 2.764 0 0 1 .76-.329 3.769
      3.769 0 0 1 1.044-.133.982.982 0 0 1 .57.24 1.806 1.806 0 0 1 .431.633 3.8 3.8 0 0 1
      .247.659q.069.279.158.772.114.531.171.765a4.048 4.048 0 0 0 .222.614 1.933 1.933 0 0 0 .393.608
      18.854 18.854 0 0 1 1.278 1.519q.62.81 1.278 1.532t.962.747a.831.831 0 0 1 .552.256.765.765 0 0 1
      .228.555v8.115a.759.759 0 0 1-.24.563.838.838 0 0 1-.57.247 9.294 9.294 0 0 0-2
      .558q-.975.329-1.526.5t-1.537.362a9.409 9.409 0 0 1-1.827.2H4.848a3.144 3.144 0 0 1-2.494-.987
      3.044 3.044 0 0 1-.621-2.291 2.461 2.461 0 0 1-.683-1.19 2.6 2.6 0 0 1 0-1.481 2.629 2.629 0 0
      1-.545-1.734 3.032 3.032 0 0 1 .189-.963zm0 0M15.797 8.102h3.646a.78.78 0 0 1 .57.24.78.78 0 0
      1 .24.57v8.102a.781.781 0 0 1-.24.57.781.781 0 0 1-.57.24h-3.646a.779.779 0 0 1-.57-.24.778.778
      0 0 1-.24-.57v-8.1a.821.821 0 0 1 .81-.81z"
      />
    </svg>
  );
};

export default withTheme(ThumbUp);
