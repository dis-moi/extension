import { graphql, navigate, useStaticQuery } from 'gatsby';
import { GetLinksQuery } from '../graphql/generated/graphql';
import { Link } from '../../../../components/websiteLMEL/molecules/Header/ListLinks';
import { SupportedLanguage } from '../../../../libs/i18n';
import { useTranslation } from 'react-i18next';

interface GetMenus {
  header: Link[];
  footer: Link[];
}

const useGetMenus = (locale: SupportedLanguage): GetMenus => {
  const data = useStaticQuery<GetLinksQuery>(
    graphql`
      query GetMenus {
        allMdx {
          nodes {
            frontmatter {
              name
              title
              locale
              label
            }
            slug
          }
        }
      }
    `
  );
  const { t } = useTranslation('websiteLMEL');
  const nodes = data.allMdx.nodes.filter(
    node => node.frontmatter?.locale === locale
  );
  const HEADER_LINKS = ['contribuer', 'faq', 'guides'];
  const FOOTER_LINKS = ['contact', 'about', 'faq', 'legal', 'cgu', 'press'];
  const footer: Link[] = [];
  const header: Link[] = [
    { label: t('header.guides'), href: () => navigate(t('links.guides')) }
  ];
  const formatLink = (node: GetLinksQuery['allMdx']['nodes'][0]) => ({
    href: () => navigate(t('links.' + node.frontmatter?.name)) || '#',
    label: node.frontmatter?.label || ''
  });

  nodes.forEach(node => {
    HEADER_LINKS.some(name => name === node.frontmatter?.name) &&
      header.push(formatLink(node));
    FOOTER_LINKS.some(name => name === node.frontmatter?.name) &&
      footer.push(formatLink(node));
  });

  return {
    header,
    footer
  };
};
export default useGetMenus;
