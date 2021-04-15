import { InstalledDetails } from 'libs/webext/types';

export interface InstallationDetails extends InstalledDetails {
  datetime?: Date;
  updatedAt?: Date;
  version: string;
}
