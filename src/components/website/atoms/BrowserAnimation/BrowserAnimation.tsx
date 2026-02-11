import React from 'react';
import AnimateCC from 'react-adobe-animate';

interface Props {
  className?: string;
}

export default ({ className }: Props) => (
  <div className={className}>
    <AnimateCC
      animationName="dismoiwebsitecoveranimation"
      composition="5ED811F4CA4D4A1082E6963D6B77B249"
    />
  </div>
);
