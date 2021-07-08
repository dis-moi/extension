import React from 'react';
import NotificationNews from './';

export default {
  title: 'Components/Molecules/NotificationNews'
};

export const Normal = () => (
  <NotificationNews news={'Ceci est un message de news'} />
);

Normal.story = {
  name: 'normal'
};
