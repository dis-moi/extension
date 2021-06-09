import React from 'react';
import styled from 'styled-components';
import Background from './Background';

const GeometricShapeBackground = styled(props => (
  <Background {...props}>
    <svg
      className="geometricShape"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1000 326.6"
    >
      <defs>
        <linearGradient
          id="gradient"
          x1="0.5"
          x2="0.5"
          y2="1"
          gradientUnits="objectBoundingBox"
        >
          <stop offset="0" stopColor="white" stopOpacity="0.1" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        fill="url(#gradient)"
        d="M277.7,9.2c-3.7-2-7.6-3.7-11.7-5c-9-2.8-18.3-4.2-27.7-4.2c-13.1,0-25.3,2.6-34.9,6.9c-2.6,1.1-5,2.5-7.4,4L0.2,115.9v210.7h1000v-8.7L277.7,9.2z"
      />
    </svg>
  </Background>
))`
  .geometricShape {
    position: absolute;
    bottom: 0;
  }
`;

export default GeometricShapeBackground;
