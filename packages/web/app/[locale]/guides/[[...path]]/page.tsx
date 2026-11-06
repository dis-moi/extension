import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  fetchProfilesData,
  findContributorInPath,
} from '../../../../lib/profilesData';
import ProfilesView from '../../ProfilesView';

const LIST: Metadata = {
  title: 'Guides',
  description:
    'Meet the DisMoi contributors and the information they publish across the web.',
  alternates: { canonical: '/en/guides' },
};

export const generateMetadata = async ({
  params,
}: {
  params: { path?: string[] };
}): Promise<Metadata> => {
  const contributor = await findContributorInPath(params.path);

  if (!contributor) {
    return LIST;
  }

  return {
    title: contributor.name,
    description: `The information published by ${contributor.name} on DisMoi.`,
    alternates: { canonical: `/en/guides/${(params.path ?? []).join('/')}` },
  };
};

export default async function GuidesRoute({
  params,
}: {
  params: { locale: string; path?: string[] };
}) {
  if (params.locale !== 'en') {
    notFound();
  }

  const { contributors, categories } = await fetchProfilesData();

  return (
    <ProfilesView
      locale="en"
      initialPath={['/en/guides', ...(params.path ?? [])].join('/')}
      contributors={contributors}
      categories={categories}
    />
  );
}
