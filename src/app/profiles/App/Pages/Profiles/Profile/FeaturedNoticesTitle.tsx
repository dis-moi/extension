import React from 'react';
import { Title2 } from 'components/atoms';
import { StatefulContributor } from 'app/lmem/contributor';

export interface FeaturedNoticesTitleProps {
  plural: boolean;
  contributor?: StatefulContributor;
  className?: string;
}

const FeaturedNoticesTitle = ({
  plural,
  contributor,
  className
}: FeaturedNoticesTitleProps) => (
  <Title2 className={className}>
    {`L${plural ? 'es' : 'a'} contribution${plural ? 's' : ''} phare${
      plural ? 's' : ''
    } ${contributor && `de ${contributor.name}`}`}
  </Title2>
);

export default FeaturedNoticesTitle;
