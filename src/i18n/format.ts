import { format as dateFormat, parseISO, isDate, isMatch } from 'date-fns';
import { getLocale as getDateLocale, DEFAULT_FORMAT } from './date';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function(value: any, format?: string, lng?: string) {
  const isoDate = typeof value === 'string' ? parseISO(value) : value;
  if (isDate(isoDate)) {
    const formatValid = format && isMatch(isoDate, format);
    if (!formatValid) {
      console.error(`Format ${format} is invalid, see date-fns docs for a list of valid formats:
https://date-fns.org/v2.22.1/docs/format
`);
    }

    return dateFormat(
      isoDate as Date,
      formatValid ? (format as string) : DEFAULT_FORMAT,
      {
        locale: getDateLocale(lng)
      }
    );
  }

  return value;
}
