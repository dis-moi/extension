import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import Tabs from 'components/molecules/Tabs';
import Tab from 'components/atoms/Tab/Tab';
import { Sidebar, TwoColumns } from 'components/atoms';

interface ProfileTabsProps {
  connected?: boolean;
}

const ProfileTabsContainer = styled(Tabs)`
  padding-top: 48px;
  margin-bottom: 48px;

  & ~ ${TwoColumns} {
    ${Sidebar} {
      margin-top: 0;
    }
  }
`;

const ProfileTabs = ({ connected }: ProfileTabsProps) => {
  const { t } = useTranslation('profiles');
  if (connected) {
    return (
      <ProfileTabsContainer>
        <Tab to={t('path.profiles.contributors')}>{t('menu.all')}</Tab>
        <Tab to={t('path.profiles.subscriptions')}>{t('menu.following')}</Tab>
      </ProfileTabsContainer>
    );
  }

  return null;
};

export default ProfileTabs;
