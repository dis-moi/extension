import { format as dateFormat, parseISO, isDate } from 'date-fns';
import { getLocale as getDateLocale, DEFAULT_FORMAT } from './date';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function(value: any, format?: string, lng?: string) {
  const isoDate = typeof value === 'string' ? parseISO(value) : value;
  if (isDate(isoDate)) {
    return dateFormat(isoDate as Date, format || DEFAULT_FORMAT, {
      locale: getDateLocale(lng)
    });
  }

  return value;
}
