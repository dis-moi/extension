import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProfilesLoader from '../../ProfilesLoader';

export const metadata: Metadata = {
  title: 'Guides',
  description:
    'Meet the DisMoi contributors and the information they publish across the web.',
  alternates: { canonical: '/en/guides' },
};

export default function GuidesRoute({
  params,
}: {
  params: { locale: string };
}) {
  if (params.locale !== 'en') {
    notFound();
  }

  return <ProfilesLoader />;
}
