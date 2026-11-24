import { Context, type Effect, Schema } from 'effect';
import type { ContributorImageField } from '../domain/UploadedImage';
import type { Visibility } from '../domain/NoticeVisibility';
import { InvalidFields } from './InvalidFields';

// Called by the Next server actions, without going through HTTP: an HTTP
// hop would only add one more serialisation and a public surface to defend.
// The declared errors are answers the form must be able to display, not
// breakdowns.

export class NoticeMissing extends Schema.TaggedError<NoticeMissing>()(
  'NoticeMissing',
  { id: Schema.Number },
) {}

export class ContributorMissing extends Schema.TaggedError<ContributorMissing>()(
  'ContributorMissing',
  { id: Schema.Number },
) {}

// pin.notice_id and notice.contributor_id are NO ACTION foreign keys, and
// Doctrine configured no cascade over them: the former administration asked
// MySQL and got a 500. These two say what holds the removal back instead.

export class NoticePinned extends Schema.TaggedError<NoticePinned>()(
  'NoticePinned',
  { id: Schema.Number, pins: Schema.Number },
) {}

export class ContributorSignsNotices extends Schema.TaggedError<ContributorSignsNotices>()(
  'ContributorSignsNotices',
  { id: Schema.Number, notices: Schema.Number },
) {}

export interface SubmittedContext {
  readonly id: number | null;
  readonly description: string | null;
  readonly exampleUrl: string | null;
  readonly urlRegex: string;
  readonly excludeUrlRegex: string | null;
  readonly querySelector: string | null;
  readonly xpath: string | null;
  readonly domains: ReadonlyArray<string>;
  // Identifiers, not names: a set is picked from the list the
  // administration shows, where a name is only a label.
  readonly domainsSets: ReadonlyArray<number>;
}

export interface SubmittedNotice {
  readonly message: string;
  readonly note: string | null;
  readonly visibility: Visibility;
  readonly locale: string | null;
  readonly excludeUrlRegex: string | null;
  readonly expires: string | null;
  readonly unpublishedOnExpiration: boolean;
  readonly contributorId: number | null;
  readonly relayers: ReadonlyArray<number>;
  readonly contexts: ReadonlyArray<SubmittedContext>;
}

export interface SubmittedContributor {
  readonly name: string;
  readonly title: string | null;
  readonly email: string | null;
  readonly website: string | null;
  readonly intro: string | null;
  readonly locale: string | null;
  readonly categories: ReadonlyArray<string>;
  readonly enabled: boolean;
  readonly pinned: ReadonlyArray<number>;
}

export class Moderation extends Context.Service<
  Moderation,
  {
    setVisibility(
      id: number,
      visibility: Visibility,
    ): Effect.Effect<void, NoticeMissing>;

    saveNotice(
      id: number,
      submitted: SubmittedNotice,
    ): Effect.Effect<void, NoticeMissing | InvalidFields>;

    createNotice(
      submitted: SubmittedNotice,
    ): Effect.Effect<number, InvalidFields>;

    // Returns the name of the screenshot the caller is responsible for
    // removing from the store, as saveContributorImage does.
    deleteNotice(
      id: number,
    ): Effect.Effect<string | null, NoticeMissing | NoticePinned>;

    saveContributor(
      id: number,
      submitted: SubmittedContributor,
    ): Effect.Effect<void, InvalidFields | ContributorMissing>;

    createContributor(
      submitted: SubmittedContributor,
    ): Effect.Effect<number, InvalidFields>;

    // Returns the storage paths of the images it carried.
    deleteContributor(
      id: number,
    ): Effect.Effect<
      ReadonlyArray<string>,
      ContributorMissing | ContributorSignsNotices
    >;

    // Returns the name of the replaced image, which the caller is
    // responsible for removing from the store.
    saveContributorImage(
      id: number,
      field: ContributorImageField,
      fileName: string,
    ): Effect.Effect<string | null, ContributorMissing>;

    // Same contract, and `null` clears the column: that is the delete
    // checkbox Vich showed next to the image.
    saveNoticeScreenshot(
      id: number,
      fileName: string | null,
    ): Effect.Effect<string | null, NoticeMissing>;
  }
>()('api/application/Moderation') {}
