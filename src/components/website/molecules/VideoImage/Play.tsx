import React from 'react';

interface PlayProps {
  className: string;
}

export default ({ className }: PlayProps) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1000 1000"
  >
    <path d="M500 0C224 0 0 224 0 500s224 500 500 500 500-224 500-500S776 0 500 0zM389.7 678.5v-357L687.3 500 389.7 678.5z" />
  </svg>
);
