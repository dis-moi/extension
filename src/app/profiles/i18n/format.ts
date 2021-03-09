import { format as dateFormat } from 'date-fns';

type FormatValue = string | Date;

export default function(value: FormatValue, format?: string, _lng?: string) {
  if (value instanceof Date) return dateFormat(value, format);
  return value;
}
