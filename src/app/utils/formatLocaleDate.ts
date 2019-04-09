export const formatLocaleDate = (date: Date) => {
  if (Number.isNaN(date.getTime())) return undefined;

  return date.toLocaleDateString(navigator.language, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export default formatLocaleDate;
