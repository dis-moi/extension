import React from 'react';
import HomePage from '@dismoi/ui/website/pages/HomePage/HomePage';
import { HomePageProps, getHomePageStaticProps } from '../../lib/homePageProps';

export default function HomeFR({ contributors }: HomePageProps) {
  return <HomePage contributors={contributors} />;
}

export const getStaticProps = getHomePageStaticProps;
