import { format as dateFormat, parseISO, isDate } from 'date-fns';
import { getLocale as getDateLocale, DEFAULT_FORMAT } from './date';

type FormatI18nValueFunction = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any,
  format?: string,
  lng?: string
) => // eslint-disable-next-line @typescript-eslint/no-explicit-any
any;

const getDateFormat: FormatI18nValueFunction = (value, format, lng) => {
  const isoDate = typeof value === 'string' ? parseISO(value) : value;
  if (isDate(isoDate)) {
    try {
      return dateFormat(isoDate as Date, format || DEFAULT_FORMAT, {
        locale: getDateLocale(lng)
      });
    } catch (e) {
      if (e instanceof RangeError) {
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
};

const getFollowersFormat: FormatI18nValueFunction = (value: number) =>
  value > 999 ? (value / 1000).toFixed(1) + 'K' : value;

const getFormat: FormatI18nValueFunction = (value, format, lng) => {
  if (parseISO(value) instanceof Date) return getDateFormat(value, format, lng);
  if (format === 'followers') return getFollowersFormat(value);
  return value;
};

export default getFormat;
