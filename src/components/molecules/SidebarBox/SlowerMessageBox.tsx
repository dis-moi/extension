import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { WEBSITE_DOMAIN } from 'libs/lmem';
import { ExternalLink, Paragraph, Title2 } from 'components/atoms';
import SidebarBox from './SidebarBox';

const Title = styled(Title2)`
  font-weight: 700;
  font-size: 18px;
  color: ${props => props.theme.textColor};
`;

export default () => {
  const { t } = useTranslation();
  return (
    <SidebarBox>
      <Title as="h3">{t('profiles:view.slower_message_box.title')}</Title>
      <Paragraph>{t('profiles:view.slower_message_box.text')}</Paragraph>
      <ExternalLink href={`https://${WEBSITE_DOMAIN}/vitesse-navigation/`}>
        {t('profiles:action.see_more_details')}
      </ExternalLink>
    </SidebarBox>
  );
};
