import React from 'react';
import dynamic from 'next/dynamic';

const ProfilesApp = dynamic(() => import('../../components/ProfilesApp'), {
  ssr: false
});

export default function SubscriptionsPage() {
  return <ProfilesApp />;
}
