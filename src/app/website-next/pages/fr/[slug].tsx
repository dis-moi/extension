import React from 'react';
import { MDXRemote } from 'next-mdx-remote';
import ContentPage from 'components/website/organisms/ContentPage/ContentPage';
import { MdxPageProps, createMdxStaticPaths, createMdxStaticProps } from '../../lib/mdxPageProps';

export default function MdxPageFR({ title, mdxSource }: MdxPageProps) {
  return (
    <article>
      <ContentPage
        title={title}
        content={<MDXRemote {...mdxSource} />}
      />
    </article>
  );
}

export const getStaticPaths = createMdxStaticPaths('fr');
export const getStaticProps = createMdxStaticProps('fr');
