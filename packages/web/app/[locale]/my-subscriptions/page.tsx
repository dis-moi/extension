import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { fetchProfilesData } from '../../../lib/profilesData';
import ProfilesView from '../ProfilesView';

export const metadata: Metadata = {
  title: 'My subscriptions',
  description: 'The DisMoi contributors you follow.',
  alternates: { canonical: '/en/my-subscriptions' },
  robots: { index: false, follow: true },
};

export default async function SubscriptionsRoute({
  params,
}: {
  params: { locale: string };
}) {
  if (params.locale !== 'en') {
    notFound();
  }

  const { contributors, categories } = await fetchProfilesData();

  return (
    <ProfilesView
      locale="en"
      initialPath="/en/my-subscriptions"
      contributors={contributors}
      categories={categories}
    />
  );
}
