/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { useFacetName } from '../../../../libs/facets/useFacetName.hook';

interface SeoProps {
  description?: string;
  lang?: string;
  meta: ConcatArray<
    | { name: string; content: string; property?: undefined }
    | { property: string; content: string; name?: undefined }
  >;
  title?: string;
}

function StaticSeo({ description, lang, meta, title = 'Dis Moi' }: SeoProps) {
  const facetName = useFacetName();
  const metaDescription = description || facetName;

  return (
    <Helmet
      htmlAttributes={{
        lang
      }}
      title={title}
      titleTemplate={`%s | ${facetName}`}
      meta={[
        {
          name: `description`,
          content: metaDescription
        },
        {
          property: `og:title`,
          content: title
        },
        {
          property: `og:description`,
          content: metaDescription
        },
        {
          property: `og:type`,
          content: `website`
        },
        {
          name: `twitter:card`,
          content: `summary`
        },
        {
          name: `twitter:creator`,
          content: facetName
        },
        {
          name: `twitter:title`,
          content: title
        },
        {
          name: `twitter:description`,
          content: metaDescription
        }
      ].concat(meta)}
    />
  );
}

StaticSeo.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``
};

StaticSeo.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired
};

export default StaticSeo;
