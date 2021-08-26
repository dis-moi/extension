import { graphql, useStaticQuery } from 'gatsby';
import { GetLinksQuery } from '../graphql/generated/graphql';
import { Link } from '../../../../components/website/molecules/Header/ListLinks';
import { SupportedLanguage } from '../../../../libs/i18n';

const useGetMenus = (
  locale: SupportedLanguage
): { header: Link[]; footer: Link[] } => {
  const data = useStaticQuery<GetLinksQuery>(
    graphql`
      query GetLinks {
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
  const nodes = data.allMdx.nodes.filter(
    node => node.frontmatter?.locale === locale
  );
  const HEADER_LINKS = ['contribuer', 'faq'];
  const FOOTER_LINKS = ['contact', 'about', 'faq', 'legal', 'cgu', 'press'];
  const footer: Link[] = [];
  const header: Link[] = [];
  const formatLink = (node: GetLinksQuery['allMdx']['nodes'][0]) => {
    return {
      href: '/' + node.slug + '/' || '#',
      label: node.frontmatter?.label || ''
    };
  };

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
