import flatten from 'flat';

export default function mapEventFromAction(action) {
  // Flatten object properties in order to track them in HEAP analytics
  const event = flatten(action, { maxDepth: 2 });

  // Drop useless properties in order to reduce objects size
  // Note: HEAP client sdk already drops object-like properties
  delete event.type;
  delete event['recommendation.description'];

  return event;
}