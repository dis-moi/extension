export const CRITERIA_TYPE_GO = 'CRITERIA_TYPE_GO';
export const CRITERIA_TYPE_NOGO = 'CRITERIA_TYPE_NOGO';
export const CRITERIA_TYPE_WARNING = 'CRITERIA_TYPE_WARNING';

export function findType(criteria) {
  return criteria.reduce((acc, { slug }) => {
    switch (slug) {
      case 'go': return CRITERIA_TYPE_GO;
      case 'no-go': return CRITERIA_TYPE_NOGO;
      case 'alert': return CRITERIA_TYPE_WARNING;
      default: return acc;
    }
  }, null);
}

export function filterTags(criteria) {
  return criteria.filter(criterion => {
    const slug = criterion.slug || criterion.get('slug');
    switch (slug) {
      case 'ethics':
      case 'price':
      case 'quality':
      case 'local':
      case 'ecology':
      case 'health':
        return true;

      default:
        return false;
    }
  });
}
