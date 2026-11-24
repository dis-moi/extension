import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { fetchProfilesData } from '../../../lib/profilesData';
import ProfilesView from '../ProfilesView';

export const metadata: Metadata = {
  title: 'Mes abonnements',
  description: 'Les contributeurs DisMoi que vous suivez.',
  alternates: { canonical: '/fr/mes-abonnements' },
  // A personal page: it has no business in an index.
  robots: { index: false, follow: true },
};

export default async function SubscriptionsRoute({
  params,
}: {
  params: { locale: string };
}) {
  if (params.locale !== 'fr') {
    notFound();
  }

  const { contributors, categories } = await fetchProfilesData();

  return (
    <ProfilesView
      locale="fr"
      initialPath="/fr/mes-abonnements"
      contributors={contributors}
      categories={categories}
    />
  );
}
