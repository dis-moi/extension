import { format as dateFormat, parseISO, isDate, isMatch } from 'date-fns';
import { getLocale as getDateLocale, DEFAULT_FORMAT } from './date';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function(value: any, format?: string, lng?: string) {
  const isoDate = typeof value === 'string' ? parseISO(value) : value;
  if (isDate(isoDate)) {
    try {
      return dateFormat(isoDate as Date, format || DEFAULT_FORMAT, {
        locale: getDateLocale(lng)
      });
    } catch (e) {
      if (e instanceof RangeError) {
        // eslint-disable-next-line no-console
        console.error(e.message);
        // given date format was invalid, format with the default one
        return dateFormat(isoDate as Date, DEFAULT_FORMAT, {
          locale: getDateLocale(lng)
        });
      } else {
        throw e;
      }
    }
  }

  return value;
}
