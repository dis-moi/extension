// toLocaleString('fr-FR') uses the narrow no-break space (U+202F), which
// many fonts render too tight for columns of figures.
export const number = (value: number): string =>
  value.toLocaleString('fr-FR').replace(/ /g, ' ');

export const shortNumber = (value: number): string => {
  if (value >= 1_000_000) return `${Math.round(value / 100_000) / 10} M`;
  if (value >= 1_000) return `${Math.round(value / 100) / 10} k`;
  return String(Math.round(value));
};

const MONTHS = [
  'janv.',
  'févr.',
  'mars',
  'avril',
  'mai',
  'juin',
  'juill.',
  'août',
  'sept.',
  'oct.',
  'nov.',
  'déc.',
];

const DATE_HEAD = /^(\d{4})-(\d{2})-(\d{2})/;

// The string is split rather than handed to Date: a wall-clock time has no
// zone, and Date would shift it by the server's.
export const shortDate = (wallClockTime: string | null): string => {
  if (wallClockTime === null) return '—';

  const found = DATE_HEAD.exec(wallClockTime);
  if (found === null) return wallClockTime;

  const [, year, month, day] = found;

  return `${Number(day)} ${MONTHS[Number(month) - 1] ?? month} ${year}`;
};

// Counted in calendar days and not in twenty-four-hour slices: a
// contribution received yesterday at 11 pm was received yesterday, and
// showing it as "today" misreads the queue. Both dates are brought back to
// noon UTC, out of reach of daylight-saving changes.
export const since = (wallClockTime: string | null): string => {
  if (wallClockTime === null) return '—';

  const found = DATE_HEAD.exec(wallClockTime);
  if (found === null) return shortDate(wallClockTime);

  const [, year, month, day] = found;
  const then = Date.UTC(Number(year), Number(month) - 1, Number(day), 12);

  const now = new Date();
  const today = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate(), 12);

  const days = Math.round((today - then) / 86_400_000);
  if (days <= 0) return 'aujourd’hui';
  if (days === 1) return 'hier';
  if (days < 31) return `il y a ${days} jours`;

  const months = Math.round(days / 30.44);
  if (months < 24) return `il y a ${months} mois`;
  return `il y a ${Math.round(months / 12)} ans`;
};

export const STATES: Record<
  string,
  { readonly label: string; readonly className: string }
> = {
  public: { label: 'Publique', className: 'admin-state-public' },
  draft: { label: 'Brouillon', className: 'admin-state-pending' },
  question: { label: 'Question', className: 'admin-state-pending' },
  archived: { label: 'Archivée', className: 'admin-state-neutral' },
  private: { label: 'Privée', className: 'admin-state-neutral' },
};

export const state = (visibility: string) =>
  STATES[visibility] ?? {
    label: visibility,
    className: 'admin-state-neutral',
  };

export const CATEGORIES: Record<string, string> = {
  CONSO: 'Conso',
  CULTURE: 'Culture & Société',
  MILITANT: 'Militant',
  DIVERS: 'Divers',
};

export const category = (code: string): string => CATEGORIES[code] ?? code;

export const excerpt = (message: string, length: number): string => {
  const bare = message.replace(/<[^>]*>/g, '').trim();
  return bare.length <= length ? bare : `${bare.slice(0, length - 1)}…`;
};
