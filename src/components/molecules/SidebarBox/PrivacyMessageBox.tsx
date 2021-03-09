import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { ExternalLink, List, Title2 } from 'components/atoms';
import SidebarBox from './SidebarBox';
import { WEBSITE_DOMAIN } from 'app/lmem';

const Ul = styled(List)`
  padding-left: 0;
`;

const ListItem = styled.li`
  line-height: initial;
  list-style-type: none;

  & + & {
    margin-top: 6px;
  }
`;

export default () => {
  const { t } = useTranslation();
  return (
    <SidebarBox>
      <Title2 as="h3">{t('view.privacy_box.title')}</Title2>
      <Ul>
        <ListItem>
          <Trans i18nKey={'view.privacy_box.no_collect'}>
            Nous ne collectons ni revendons
            <strong>aucune donnée personnelle</strong>
          </Trans>
        </ListItem>
        <ListItem>
          <Trans i18nKey={'view.privacy_box.no_profiling'}>
            Nous ne faisons <strong>aucun profilage</strong>
          </Trans>
        </ListItem>
      </Ul>

      <ExternalLink href={`https://${WEBSITE_DOMAIN}/vie-privee/`}>
        {t('action.know_more')}
      </ExternalLink>
    </SidebarBox>
  );
};
