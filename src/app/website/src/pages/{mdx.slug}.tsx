import React from 'react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { MdxBySlugQuery } from '../graphql/generated/graphql';
import Layout from '../components/Layout';
import ContentPage from '../../../../components/website/organisms/ContentPage/ContentPage';

interface AboutPageProps {
  data: MdxBySlugQuery;
  uri: string;
}

const Page = ({ data }: AboutPageProps) => {
  const content = data?.mdx?.body && <MDXRenderer>{data.mdx.body}</MDXRenderer>;
  if (!content) return null;
  const title = data?.mdx?.frontmatter?.title || '';

  return (
    <Layout pageTitle={title} scrolled={true}>
      <article className={'className'}>
        <ContentPage title={title} content={content} />
      </article>
    </Layout>
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
