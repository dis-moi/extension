export default (strDate) => {
  const dateObject = new Date(strDate);

  if (Number.isNaN(dateObject.getTime())) return undefined;

  return dateObject.toLocaleDateString(
    navigator.language,
    {
      weekday: 'long',
      year: 'numeric',
      month: 'long', 
      day: 'numeric'
    }
  );
};