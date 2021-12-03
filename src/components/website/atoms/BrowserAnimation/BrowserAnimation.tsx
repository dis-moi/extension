import React from 'react';
import AnimateCC from 'react-adobe-animate';
import { getFacet } from 'libs/facets/getFacet';

interface Props {
  className?: string;
}

export default ({ className }: Props) => (
  <div className={className}>
    {getFacet() === 'lmel' ? (
      <AnimateCC
        animationName="lmelwebsitecoveranimation"
        composition="5ED811F4CA4D4A1082E6963D6B77B249"
      />
    ) : (
      <AnimateCC
        animationName="dismoiwebsitecoveranimation"
        composition="5ED811F4CA4D4A1082E6963D6B77B249"
      />
    )}
  </div>
);
