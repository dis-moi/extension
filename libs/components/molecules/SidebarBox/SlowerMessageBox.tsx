import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { ExternalLink, Paragraph, Title2 } from 'libs/components/atoms';
import SidebarBox from './SidebarBox';
import { WEBSITE_DOMAIN } from 'src/app/lmem';

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
