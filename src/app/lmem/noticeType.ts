import { Criterion } from './criterion';

export type NoticeType =
  | 'Approval'
  | 'Disapproval'
  | 'Tip'
  | 'Alternative'
  | 'Other';

export function findType(criteria: Criterion[]): NoticeType {
  return criteria.reduce((acc: NoticeType, { slug }: Criterion): NoticeType => {
    switch (slug) {
      case 'go':
        return 'Approval';
      case 'no-go':
        return 'Disapproval';
      case 'alert':
        return 'Tip';
      default:
        return acc;
    }
  }, 'Other');
}

type Referential<T> = { [key in NoticeType]: T };

export const getTypeOrFallback = <T extends any>(
  referential: Referential<T>
) => (type?: NoticeType): T =>
  type && type in referential ? referential[type] : referential.Other;
