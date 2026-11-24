import { Context, type Effect, Schema } from 'effect';
import type { DetailedNotice } from './V3Reads';

// Unlike the reads, the errors are declared: they are foreseen answers of the
// business, which the HTTP layer turns into status codes.

export class NoticeNotFound extends Schema.TaggedError<NoticeNotFound>()(
  'NoticeNotFound',
  { id: Schema.Number },
) {}

export class UnknownContributor extends Schema.TaggedError<UnknownContributor>()(
  'UnknownContributor',
  { id: Schema.Number },
) {}

export class InvalidContribution extends Schema.TaggedError<InvalidContribution>()(
  'InvalidContribution',
  { reason: Schema.String },
) {}

export interface AskedRating {
  readonly noticeId: number;
  readonly ratingType: string;
  readonly url: string;
  readonly geolocation: string;
  readonly reason: string;
}

export interface ReceivedContribution {
  readonly url: string;
  readonly contributorName: string;
  readonly contributorEmail: string;
  readonly message: string;
  readonly toContributorId: number | null;
  readonly question: boolean;
}

export class V3Writes extends Context.Service<
  V3Writes,
  {
    rate(asked: AskedRating): Effect.Effect<void, NoticeNotFound>;

    // Subscriptions missing from the list are removed, the others created or
    // confirmed. The extension itself is created when it is unknown.
    refreshSubscriptions(
      extensionId: string,
      contributors: ReadonlyArray<number>,
    ): Effect.Effect<void, UnknownContributor>;

    // The notice is born a draft, or a question when it is addressed to a
    // contributor. A contributor is created when their address is unknown.
    recordContribution(
      contribution: ReceivedContribution,
    ): Effect.Effect<DetailedNotice, InvalidContribution>;
  }
>()('api/application/V3Writes') {}
