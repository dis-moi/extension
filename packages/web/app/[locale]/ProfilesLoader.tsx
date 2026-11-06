'use client';

import React from 'react';
import dynamic from 'next/dynamic';

/**
 * L'application des profils ne se rend qu'au navigateur : elle crée son
 * historique, ouvre un canal vers l'extension et lit son état depuis le
 * stockage local. `ssr: false` n'est autorisé que dans un composant client,
 * d'où ce fichier.
 *
 * @see https://nextjs.org/docs/app/guides/lazy-loading
 */
const ProfilesApp = dynamic(() => import('../../components/ProfilesApp'), {
  ssr: false,
});

export default function ProfilesLoader() {
  return <ProfilesApp />;
}
