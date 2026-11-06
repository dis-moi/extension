import React from 'react';
import { fetchHomeContributors } from '../../lib/homeContributors';
import HomeView from './HomeView';

// Les contributeurs mis en avant changent rarement : la page est régénérée
// au plus une fois par heure.
export const revalidate = 3600;

export default async function Home() {
  const contributors = await fetchHomeContributors();

  return <HomeView contributors={contributors} />;
}
