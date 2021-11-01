import React from 'react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { MdxBySlugQuery } from '../graphql/generated/graphql';
import ContentPage from '../../../../components/websiteLMEL/organisms/ContentPage/ContentPage';

interface PageProps {
  data: MdxBySlugQuery;
  uri: string;
}

const Page = ({ data }: PageProps) => {
  const content = data?.mdx?.body && <MDXRenderer>{data.mdx.body}</MDXRenderer>;
  if (!content) return null;
  const title = data?.mdx?.frontmatter?.title || '';

  return (
    <article className={'className'}>
      <ContentPage title={title} content={content} />
    </article>
  );
};

export const query = graphql`
  query MdxBySlug($slug: String) {
    mdx(slug: { eq: $slug }) {
      body
      frontmatter {
        title
      }
      slug
    }
  }
`;

export default Page;
