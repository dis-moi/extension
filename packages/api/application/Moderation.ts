import { Context, type Effect, Schema } from 'effect';
import type { ContributorImageField } from '../domain/UploadedImage';
import type { Visibility } from '../domain/NoticeVisibility';

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

export class InvalidFields extends Schema.TaggedError<InvalidFields>()(
  'InvalidFields',
  { reasons: Schema.Array(Schema.String) },
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

    saveContributor(
      id: number,
      submitted: SubmittedContributor,
    ): Effect.Effect<void, InvalidFields | ContributorMissing>;

    // Returns the name of the replaced image, which the caller is
    // responsible for removing from the store.
    saveContributorImage(
      id: number,
      champ: ContributorImageField,
      nomDeFichier: string,
    ): Effect.Effect<string | null, ContributorMissing>;
  }
>()('api/application/Moderation') {}
