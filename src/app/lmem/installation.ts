import InstalledDetails = chrome.runtime.InstalledDetails;

export interface InstallationDetails extends InstalledDetails {
  datetime?: Date;
  updatedAt?: Date;
  version: string;
}
