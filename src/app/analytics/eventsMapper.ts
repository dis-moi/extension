import { Action } from 'redux';
import flatten from 'flat';

interface FlattenAction {
  type: string;
  [key: string]: any;
}

export default function mapEventFromAction(action: Action) {
  // Flatten object properties in order to track them in HEAP analytics
  const event = flatten<Action, FlattenAction>(action, { maxDepth: 2 });

  // Drop useless properties in order to reduce objects size
  // Note: HEAP client sdk already drops object-like properties
  delete event.type;
  delete event['notice.message'];

  return event;
}
