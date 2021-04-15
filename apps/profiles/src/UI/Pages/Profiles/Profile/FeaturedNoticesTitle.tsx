import React from 'react';
import { useTranslation } from 'react-i18next';
import { Title2 } from 'src/components/atoms';
import { StatefulContributor } from 'libs/lmem/contributor';

export interface FeaturedNoticesTitleProps {
  featuredNoticesCount: number;
  contributor?: StatefulContributor;
  className?: string;
}

const FeaturedNoticesTitle = ({
  featuredNoticesCount,
  contributor,
  className
}: FeaturedNoticesTitleProps) => {
  const { t } = useTranslation();
  return (
    <Title2 className={className}>
      {t('profiles:view.profile.featured_notices.title', {
        contributorName: contributor?.name,
        count: featuredNoticesCount
      })}
    </Title2>
  );
};

export default FeaturedNoticesTitle;
