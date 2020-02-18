export interface ServiceMessageAction {
  label: string;
  url: string;
}

export default interface ServiceMessageState {
  messages: string[];
  action?: ServiceMessageAction;
  lastShownDate?: Date;
}
