import type {
  TargetingContext,
  RestrictedContext,
  Contributor,
  Notice,
  PinnedNotice,
} from '../../application/ReadModels';
import { renderMessage, stripMessage, UTM_MEDIUM } from '../../domain/Message';
import { formatDateTime } from './dateTime';
import { avatar, uploadUrl } from './media';

// THE KEY ORDER IS PART OF THE CONTRACT: json_encode serialises in
// insertion order, and the body is compared byte for byte with the PHP one.
// Moving a line changes the response.

export const noticeUrl = (origin: string, id: number): string =>
  `${origin}/api/v3/notices/${id}`;

// array_filter of PHP: null, empty string, 0 and false disappear. That is
// why a context with no xpath has no xpath key at all.
const withoutFalsyValues = <T extends Record<string, unknown>>(
  object: T,
): Partial<T> => {
  const kept: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(object)) {
    const falsy =
      value === null ||
      value === undefined ||
      value === '' ||
      value === 0 ||
      value === false;
    if (!falsy) kept[key] = value;
  }
  return kept as Partial<T>;
};

// json_encode returns a list when the keys are exactly 0..n-1, an object
// otherwise. Doctrine's Collection::filter keeps the keys, so a contributor
// one of whose relays is not public comes out as {"0":…,"1":…,"10":…} — 23
// of the 178 served contributors, and for years.
const phpArray = <V>(
  entries: ReadonlyArray<readonly [number, V]>,
): ReadonlyArray<V> | Record<string, V> => {
  const isAList = entries.every(([key], rank) => key === rank);
  if (isAList) return entries.map(([, value]) => value);

  const object: Record<string, V> = {};
  for (const [key, value] of entries) object[String(key)] = value;
  return object;
};

// Deprecated, but still served.
const example = (origin: string, notice: Notice) => ({
  exampleMatchingUrl: notice.exampleMatchingUrl,
  noticeId: notice.id,
  noticeUrl: noticeUrl(origin, notice.id),
  screenshot: uploadUrl(origin, 'screenshotFile', notice.screenshot),
});

const pinnedNotice = (origin: string, notice: PinnedNotice) => ({
  sort: notice.pinnedSort,
  id: notice.id,
  url: noticeUrl(origin, notice.id),
  strippedMessage: stripMessage(notice.message),
  exampleMatchingUrl: notice.exampleMatchingUrl,
  // Two deprecated keys the installed extension may still read.
  noticeId: notice.id,
  noticeUrl: noticeUrl(origin, notice.id),
  screenshot: uploadUrl(origin, 'screenshotFile', notice.screenshot),
  created: formatDateTime(notice.created),
  modified: formatDateTime(notice.updated),
  locale: notice.locale,
});

export const serialiseContributor = (
  origin: string,
  contributor: Contributor,
  utmMedium: string = UTM_MEDIUM,
): Record<string, unknown> => {
  // The first pinned one, otherwise the first public one:
  // Collection::first() returns false on an empty collection, and the ?: of
  // the PHP switches over.
  const highlighted =
    contributor.pinnedNotices[0] ?? contributor.publicNotices[0];
  const featured =
    highlighted === undefined ? null : example(origin, highlighted);

  return {
    id: contributor.id,
    name: contributor.name,
    title: contributor.title,
    website: contributor.website,
    intro:
      contributor.intro === null || contributor.intro === ''
        ? null
        : renderMessage(contributor.intro, utmMedium),
    avatar: avatar(origin, contributor.image),
    banner: uploadUrl(origin, 'bannerImageFile', contributor.bannerImage),
    preview: uploadUrl(origin, 'previewImageFile', contributor.previewImage),
    contributions: contributor.publicNotices.length,
    contribution: {
      example: featured,
      starred: featured,
      pinnedNotices: contributor.pinnedNotices.map((notice) =>
        pinnedNotice(origin, notice),
      ),
      numberOfPublishedNotices: contributor.publicNotices.length,
    },
    ratings: { subscribes: contributor.subscribersActiveInTheLastSevenDays },
    noticesUrls: contributor.publicNotices.map((notice) =>
      noticeUrl(origin, notice.id),
    ),
    // The visibility filter keeps the original indices, cf. phpArray.
    relayedNoticesUrls: phpArray(
      contributor.relays.flatMap((notice, rank) =>
        notice.visibility === 'public'
          ? [[rank, noticeUrl(origin, notice.id)] as const]
          : [],
      ),
    ),
    categories: contributor.categories,
    locale: contributor.locale,
  };
};

// Two shapes, depending on INCLUDE_CONTRIBUTORS_DETAILS: the list carries
// only the identifiers, the single view unfolds the whole contributors.
export const serialiseNotice = (
  origin: string,
  notice: Notice,
  details:
    | { readonly with: false }
    | {
        readonly with: true;
        readonly contributor: Contributor | null;
        readonly relayers: ReadonlyArray<Contributor>;
      },
  utmMedium: string = UTM_MEDIUM,
): Record<string, unknown> => {
  const base = {
    id: notice.id,
    url: noticeUrl(origin, notice.id),
    message: renderMessage(notice.message, utmMedium),
    strippedMessage: stripMessage(notice.message),
    visibility: notice.visibility,
    // Deprecated, and returns the same value as the next one.
    exampleUrl: notice.exampleMatchingUrl,
    exampleMatchingUrl: notice.exampleMatchingUrl,
    screenshot: uploadUrl(origin, 'screenshotFile', notice.screenshot),
    ratings: { likes: notice.likedCount, dislikes: notice.dislikedCount },
    created: formatDateTime(notice.created),
    modified: formatDateTime(notice.updated),
    locale: notice.locale,
  };

  return details.with
    ? {
        ...base,
        contributor:
          details.contributor === null
            ? null
            : serialiseContributor(origin, details.contributor, utmMedium),
        relayers: details.relayers.map((relayer) =>
          serialiseContributor(origin, relayer, utmMedium),
        ),
      }
    : {
        ...base,
        contributorId: notice.contributorId,
        relayersIds: notice.relayerIds,
      };
};

export const serialiseTargetingContext = (
  origin: string,
  context: TargetingContext,
): Record<string, unknown> =>
  withoutFalsyValues({
    id: context.id,
    noticeId: context.noticeId,
    noticeUrl: noticeUrl(origin, context.noticeId),
    urlRegex: context.urlRegex,
    excludeUrlRegex: context.excludeUrlRegex,
    querySelector: context.querySelector,
    xpath: context.xpath,
  });

export const serialiseRestrictedContext = (
  context: RestrictedContext,
): Record<string, unknown> => ({ urlRegex: context.urlRegex });

// They do not come from the database: CategoryRepository builds them from
// the CategoryName enumeration of the PHP code.
export const CATEGORIES: Record<string, string> = {
  CONSO: 'Conso',
  CULTURE: 'Culture & Société',
  MILITANT: 'Militant',
  DIVERS: 'Divers',
};
