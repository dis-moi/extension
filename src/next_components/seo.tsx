import React, { FunctionComponent } from 'react';
import Head from 'next/head';

interface Props {
  title: string;
  path?: string;
}

const Seo: FunctionComponent<Props> = ({ title, path }) => {
  const url = 'https://dismoi.io' + (path || '');
  console.log(title, path, url);
  return (
    <Head>
      <title>{title} | DisMoi</title>
      <meta
        name="description"
        content="Internautes, media, experts vous informent directement sur les pages web visitées : alerte contre une arnaque, signalement d’une fausse information, alternative, etc. Extension navigateur gratuite et sans publicité."
      />

      <meta property="og:type" content="website" />
      <meta property="og:locale" content="fr_FR" />
      <meta property="og:site_name" content="DisMoi" />
      <meta property="og:title" content={title} />
      <meta property="og:url" content={url} />
      <meta
        property="og:description"
        content="Internautes, media, experts vous informent directement sur les pages web visitées : alerte contre une arnaque, signalement d’une fausse information, alternative, etc. Extension navigateur gratuite et sans publicité."
      />
      <meta
        property="og:image"
        content="https://www.dismoi.io/wp-content/uploads/2020/10/DISMOI-ne-naviguez-plus-seuls.jpg"
      />

      <meta name="twitter:site" content="@DisMoiCompagnon" />
      <meta name="twitter:title" content={title} />
      <meta
        name="twitter:description"
        content="Internautes, media, experts vous informent directement sur les pages web visitées : alerte contre une arnaque, signalement d’une fausse information, alternative, etc. Extension navigateur gratuite et sans publicité."
      />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:image"
        content="https://www.dismoi.io/wp-content/uploads/2020/10/DISMOI-ne-naviguez-plus-seuls.jpg"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'WebSite',
                '@id': 'https://www.dismoi.io/#website',
                url: 'https://www.dismoi.io/',
                name: 'DisMoi',
                description:
                  'Ne naviguez plus seul sur le web : Internautes, media, experts vous alertent directement sur les pages web que vous visitez',
                potentialAction: [
                  {
                    '@type': 'SearchAction',
                    target: 'https://www.dismoi.io/?s={search_term_string}',
                    'query-input': 'required name=search_term_string'
                  }
                ],
                inLanguage: 'fr-FR'
              },
              {
                '@type': 'ImageObject',
                '@id': 'https://www.dismoi.io/#primaryimage',
                inLanguage: 'fr-FR',
                url:
                  'https://www.dismoi.io/wp-content/uploads/2020/10/icn-lock.png',
                width: 34,
                height: 45,
                caption: 'vie-privee'
              },
              {
                '@type': 'WebPage',
                '@id': 'https://www.dismoi.io/#webpage',
                url: 'https://www.dismoi.io/',
                name:
                  "DisMoi - Reprenez le contr\u00f4le de l'information sur le web",
                isPartOf: { '@id': 'https://www.dismoi.io/#website' },
                primaryImageOfPage: {
                  '@id': 'https://www.dismoi.io/#primaryimage'
                },
                datePublished: '2019-11-13T15:46:13+00:00',
                dateModified: '2021-01-27T12:32:16+00:00',
                description:
                  'Internautes, media, experts vous informent directement sur les pages web visit\u00e9es : alerte contre une arnaque, signalement d\u2019une fausse information, alternative, etc. Extension navigateur gratuite et sans publicit\u00e9.',
                inLanguage: 'fr-FR',
                potentialAction: [
                  { '@type': 'ReadAction', target: ['https://www.dismoi.io/'] }
                ]
              }
            ]
          })
        }}
      />
    </Head>
  );
};

export default Seo;
