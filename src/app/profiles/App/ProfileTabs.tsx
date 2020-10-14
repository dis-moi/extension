import React from 'react';
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
  if (connected) {
    return (
      <ProfileTabsContainer>
        <Tab to={'/sources'}>Sources</Tab>
        <Tab to={'/mes-abonnements'}>Abonnements</Tab>
      </ProfileTabsContainer>
    );
  }

  return null;
};

export default ProfileTabs;
