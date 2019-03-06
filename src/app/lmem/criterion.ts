export interface Criterion {
  label: string;
  slug: string;
  isSelected?: boolean;
}

export type Criteria = { [key: string]: Criterion };

export const selectCriterion = (criterion: Criterion): Criterion => ({
  ...criterion,
  isSelected: true
});

export const unselectCriterion = (criterion: Criterion): Criterion => ({
  ...criterion,
  isSelected: false
});
