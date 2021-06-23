import React from 'react';

interface CrossProps {
  className: string;
}

export default ({ className }: CrossProps) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 1000 1000"
  >
    <path
      fill="white"
      d="M1000 81.2L918.8 0 500 418.8 81.2 0 0 81.2 418.8 500 0 918.8l81.2 81.2L500 581.2 918.8 1000l81.2-81.2L581.2 500z"
    />
  </svg>
);
