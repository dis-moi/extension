import React from 'react';
import { MDXRemote } from 'next-mdx-remote';
import ContentPage from 'components/website/organisms/ContentPage/ContentPage';
import { MdxPageProps, createMdxStaticPaths, createMdxStaticProps } from '../../lib/mdxPageProps';

export default function MdxPageEN({ title, mdxSource }: MdxPageProps) {
  return (
    <article>
      <ContentPage
        title={title}
        content={<MDXRemote {...mdxSource} />}
      />
    </article>
  );
}

export const getStaticPaths = createMdxStaticPaths('en');
export const getStaticProps = createMdxStaticProps('en');
