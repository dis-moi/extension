import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProfilesLoader from '../ProfilesLoader';

export const metadata: Metadata = {
  title: 'Mes abonnements',
  description: 'Les contributeurs DisMoi que vous suivez.',
  alternates: { canonical: '/fr/mes-abonnements' },
  // Page personnelle : elle n'a rien à faire dans un index.
  robots: { index: false, follow: true },
};

export default function SubscriptionsRoute({
  params,
}: {
  params: { locale: string };
}) {
  if (params.locale !== 'fr') {
    notFound();
  }

  return <ProfilesLoader />;
}
