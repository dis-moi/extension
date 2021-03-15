import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import Tabs from 'components/molecules/Tabs';
import Tab from 'components/atoms/Tab/Tab';
import { Sidebar, TwoColumns } from 'components/atoms';
import { CONTRIBUTORS_PATH } from '../routes';

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
  const { t } = useTranslation();
  if (connected) {
    return (
      <ProfileTabsContainer>
        <Tab to={CONTRIBUTORS_PATH}>{t('profiles:menu.sources')}</Tab>
        <Tab to={'/mes-abonnements'}>{t('profiles:menu.subscriptions')}</Tab>
      </ProfileTabsContainer>
    );
  }

  return null;
};

export default ProfileTabs;
