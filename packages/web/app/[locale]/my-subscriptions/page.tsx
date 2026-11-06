import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProfilesLoader from '../ProfilesLoader';

export const metadata: Metadata = {
  title: 'My subscriptions',
  description: 'The DisMoi contributors you follow.',
  alternates: { canonical: '/en/my-subscriptions' },
  robots: { index: false, follow: true },
};

export default function SubscriptionsRoute({
  params,
}: {
  params: { locale: string };
}) {
  if (params.locale !== 'en') {
    notFound();
  }

  return <ProfilesLoader />;
}
