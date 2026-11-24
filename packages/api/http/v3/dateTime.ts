// MySQL datetime columns carry no timezone: they store a wall-clock time,
// which PHP formats with ->format('c') in its default zone. The time is
// therefore not converted, only completed: the database says
// 2024-09-30 23:13:17, the API serves 2024-09-30T23:13:17+02:00. Converting
// to UTC would shift every date by an hour or two.

// Observed over the whole served corpus, which holds only +01:00 and
// +02:00.
export const TIME_ZONE = 'Europe/Paris';

const formattersByZone = new Map<string, Intl.DateTimeFormat>();

const formatter = (zone: string): Intl.DateTimeFormat => {
  const known = formattersByZone.get(zone);
  if (known !== undefined) return known;

  const made = new Intl.DateTimeFormat('en-US', {
    timeZone: zone,
    timeZoneName: 'longOffset',
  });
  formattersByZone.set(zone, made);
  return made;
};

const offsetAt = (instant: number, zone: string): number => {
  const name = formatter(zone)
    .formatToParts(new Date(instant))
    .find((part) => part.type === 'timeZoneName')?.value;

  // A bare GMT means a zero offset, and that is what Intl returns for the
  // winter time of London as well as for UTC.
  const found = /^GMT([+-])(\d{2}):(\d{2})$/.exec(name ?? 'GMT');
  if (found === null) return 0;

  const [, sign, hours, minutes] = found;
  const magnitude = Number(hours) * 60 + Number(minutes);
  return sign === '-' ? -magnitude : magnitude;
};

const twoDigits = (n: number): string => String(n).padStart(2, '0');

const suffix = (offset: number): string => {
  const sign = offset < 0 ? '-' : '+';
  const magnitude = Math.abs(offset);
  return `${sign}${twoDigits(Math.floor(magnitude / 60))}:${twoDigits(magnitude % 60)}`;
};

export const formatDateTime = (
  wallClockTime: string,
  zone: string = TIME_ZONE,
): string => {
  const normalised = wallClockTime.trim().replace(' ', 'T');
  const asUtc = Date.parse(`${normalised}Z`);

  if (Number.isNaN(asUtc)) {
    throw new Error(`Unreadable time: ${JSON.stringify(wallClockTime)}.`);
  }

  // Two passes: the first estimates the offset by reading the wall-clock
  // time as UTC, the second corrects it when the instant so obtained falls
  // on the other side of a daylight-saving change.
  const estimate = offsetAt(asUtc, zone);
  const offset = offsetAt(asUtc - estimate * 60_000, zone);

  return `${normalised}${suffix(offset)}`;
};
