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
 * Chaque page porte enfin son propre titre et sa propre description. Le site
 * n'en avait qu'une seule, écrite en dur et en français, pour ses
 * trente-quatre routes.
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
            // Le contenu vient de WordPress : c'est du Markdown, pas du MDX.
            // Sans ce mode, « <title> » dans une phrase est lu comme une
            // balise JSX jamais refermée et la compilation échoue.
            options={{ mdxOptions: { format: 'md' } }}
          />
        }
      />
    </article>
  );
}
