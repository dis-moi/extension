export type Intention =
  | 'approval'
  | 'disapproval'
  | 'information'
  | 'alternative'
  | 'other';

export const intentions: Intention[] = [
  'approval',
  'disapproval',
  'information',
  'alternative',
  'other'
];

type Referential<T> = { [key in Intention]: T };

export const getTypeOrFallback = <T extends unknown>(
  referential: Referential<T>
) => (intention?: Intention): T =>
  intention && intention in referential
    ? referential[intention]
    : referential.other;
