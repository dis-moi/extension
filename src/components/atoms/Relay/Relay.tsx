import styled from 'styled-components';
import React from 'react';
import { useTranslation } from 'react-i18next';
import RelayIcon from '../icons/Relay';
import { ContributorNotice } from '../../organisms/NoticeDetails/NoticeDetails';

export const RelayPart = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  font-size: 12px;

  & > svg {
    width: 16px;
    height: auto;
    margin-right: 6px;
  }
`;

const Relayer = styled(ContributorNotice)`
  max-width: 205px;
  margin-left: 4px;
  line-height: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

interface Relay {
  user: string;
  onClick?: () => void;
}

const Relay = ({ user, onClick }: Relay) => {
  const { t } = useTranslation();

  return (
    <RelayPart>
      <RelayIcon />
      <Relayer onClick={onClick}>
        {t('common.relayed_by')} {user}
      </Relayer>
    </RelayPart>
  );
};

export default Relay;
