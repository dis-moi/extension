export enum LinkType {
  Options = 'options',
  Internal = 'internal',
  External = 'external'
}

export interface ServiceMessageAction {
  label: string;
  url: string;
  type: LinkType;
}

export default interface ServiceMessageState {
  messages: string[];
  action?: ServiceMessageAction;
  lastShownDate?: Date;
}
