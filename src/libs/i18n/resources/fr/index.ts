import { getFacet } from 'libs/facets/getFacet';
import extension from './extension.json';
import profiles from './profiles.json';
import website from './website.json';
import websiteLMEL from './websiteLMEL.json';

export default {
  extension,
  profiles,
  website: getFacet() === 'lmel' ? websiteLMEL : website
};
