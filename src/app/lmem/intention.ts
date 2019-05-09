export type Intention =
  | 'approval'
  | 'disapproval'
  | 'tip'
  | 'alternative'
  | 'other';

export const intentions: Intention[] = [
  'approval',
  'disapproval',
  'tip',
  'alternative',
  'other'
];

type Referential<T> = { [key in Intention]: T };

export const getTypeOrFallback = <T extends any>(
  referential: Referential<T>
) => (intention?: Intention): T =>
  intention && intention in referential
    ? referential[intention]
    : referential.other;
