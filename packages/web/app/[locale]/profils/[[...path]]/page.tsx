import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  fetchProfilesData,
  findContributorInPath,
} from '../../../../lib/profilesData';
import ProfilesView from '../../ProfilesView';

const LISTE: Metadata = {
  title: 'Les contributeurs',
  description:
    'Découvrez les contributeurs DisMoi et les informations qu’ils publient sur le web.',
  alternates: { canonical: '/fr/profils' },
};

export const generateMetadata = async ({
  params,
}: {
  params: { path?: string[] };
}): Promise<Metadata> => {
  const contributor = await findContributorInPath(params.path);

  if (!contributor) {
    return LISTE;
  }

  return {
    title: contributor.name,
    description: `Les informations publiées par ${contributor.name} sur DisMoi.`,
    alternates: {
      canonical: `/fr/profils/${(params.path ?? []).join('/')}`,
    },
  };
};

export default async function ProfilesRoute({
  params,
}: {
  params: { locale: string; path?: string[] };
}) {
  // Le chemin des profils n'existe qu'en français ; son équivalent anglais
  // est « /en/guides ».
  if (params.locale !== 'fr') {
    notFound();
  }

  const { contributors, categories } = await fetchProfilesData();

  return (
    <ProfilesView
      locale="fr"
      initialPath={['/fr/profils', ...(params.path ?? [])].join('/')}
      contributors={contributors}
      categories={categories}
    />
  );
}
