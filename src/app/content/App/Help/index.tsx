import React from 'react';
import { useTranslation } from 'react-i18next';
import { List, ExternalLink, Anchor } from 'components/atoms';
import withTitle from 'app/content/hocs/withTitle';
import { WEBSITE_DOMAIN } from 'libs/domain';
import Content from '../Account/About/Content';
import Container from './Container';
import ContentTitle from './ContentTitle';

export const Help = () => {
  const { t } = useTranslation();
  return (
    <Container>
      <ContentTitle>{t('faq.title')}</ContentTitle>
      <List>
        <li>
          <ExternalLink href={`https://${WEBSITE_DOMAIN}${t('path.appear')}/`}>
            {t('faq.notices.where_appear')}
          </ExternalLink>
        </li>
        <li>
          <ExternalLink
            href={`https://${WEBSITE_DOMAIN}${t(
              'path.problem_post_appearing'
            )}/`}
          >
            {t('faq.notices.dont_appear')}
          </ExternalLink>
        </li>
        <li>
          <ExternalLink href={`https://${WEBSITE_DOMAIN}${t('path.privacy')}/`}>
            {t('faq.privacy.used_data')}
          </ExternalLink>
        </li>
        <li>
          <ExternalLink href={`https://${WEBSITE_DOMAIN}${t('path.help')}/`}>
            {t('faq.other_questions.title')}
          </ExternalLink>
        </li>
      </List>

      <ContentTitle>{t('view.help.contact_support')}</ContentTitle>
      <Content>
        {t('view.help.write_to')}{' '}
        <Anchor href="mailto:support@dismoi.io">support@dismoi.io</Anchor>.
      </Content>
    </Container>
  );
};

export default withTitle<{}>('title.help')(Help);
