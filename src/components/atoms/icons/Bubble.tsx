import React from 'react';
import styled from 'styled-components';

interface Props {
  className?: string;
}

const Bubble = ({ className }: Props) => (
  <svg width="16.262" height="16" className={className}>
    <path
      fill="#404040"
      d="M4.024 16a1.008 1.008 0 0 1-.468-.116 1.006 1.006 0 0 1-.534-.886v-2.719a6.139 6.139 0 0 1-3.021-5.47c0-3.882 3.5-6.81 8.131-6.81s8.127 2.929 8.127 6.811-3.5 6.809-8.131 6.809h-.2l-3.355 2.219a1 1 0 0 1-.549.162zM8.131 1.556c-3.746 0-6.572 2.26-6.572 5.254a4.609 4.609 0 0 0 2.6 4.322.781.781 0 0 1 .42.692v2.138l2.7-1.788a.806.806 0 0 1 .468-.128H7.8c.108.006.217.012.327.012 3.746 0 6.572-2.257 6.572-5.25s-2.822-5.252-6.568-5.252z"
    />
  </svg>
);
export default styled(Bubble)``;
