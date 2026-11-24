import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import {
  ContentLocale,
  listContentSlugs,
  readContentPage,
} from '../../../lib/content';
import ContentView from '../ContentView';

interface ContentRouteParams {
  locale: ContentLocale;
  slug: string;
}

export const generateStaticParams = ({
  params,
}: {
  params: { locale: ContentLocale };
}) => listContentSlugs(params.locale).map((slug) => ({ slug }));

/**
 * Each page finally carries its own title and its own description. The site
 * had a single one, hard-coded and in French, for its thirty-four routes.
 */
export const generateMetadata = ({
  params,
}: {
  params: ContentRouteParams;
}): Metadata => {
  const page = readContentPage(params.locale, params.slug);

  if (!page) {
    return {};
  }

  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: `/${params.locale}/${params.slug}` },
    openGraph: {
      title: page.title,
      description: page.description,
      locale: params.locale,
      type: 'article',
    },
  };
};

export default function ContentRoute({
  params,
}: {
  params: ContentRouteParams;
}) {
  const page = readContentPage(params.locale, params.slug);

  if (!page) {
    notFound();
  }

  return (
    <article>
      <ContentView
        title={page.title}
        content={
          <MDXRemote
            source={page.body}
            // The content comes from WordPress: it is Markdown, not MDX.
            // Without this mode, a `<title>` inside a sentence reads as a
            // JSX tag that is never closed and the compilation fails.
            options={{ mdxOptions: { format: 'md' } }}
          />
        }
      />
    </article>
  );
}
