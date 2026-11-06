import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProfilesLoader from '../../ProfilesLoader';

export const metadata: Metadata = {
  title: 'Les contributeurs',
  description:
    'Découvrez les contributeurs DisMoi et les informations qu’ils publient sur le web.',
  alternates: { canonical: '/fr/profils' },
};

export default function ProfilesRoute({
  params,
}: {
  params: { locale: string };
}) {
  // Le chemin des profils n'existe qu'en français ; son équivalent anglais
  // est « /en/guides ».
  if (params.locale !== 'fr') {
    notFound();
  }

  return <ProfilesLoader />;
}
