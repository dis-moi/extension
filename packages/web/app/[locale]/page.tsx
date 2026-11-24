import React from 'react';
import { fetchHomeContributors } from '../../lib/homeContributors';
import HomeView from './HomeView';

// The highlighted contributors rarely change: the page is regenerated at
// most once an hour.
export const revalidate = 3600;

export default async function Home() {
  const contributors = await fetchHomeContributors();

  return <HomeView contributors={contributors} />;
}
