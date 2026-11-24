import { Context, type Effect } from 'effect';
import type {
  Contributor,
  Notice,
  NoticesPage,
  RestrictedContext,
  TargetingContext,
} from './ReadModels';

// No method declares a business error: a read that fails is a defect, not a
// foreseen case, and the HTTP handler lets it surface as a 500 exactly as the
// PHP backend does.

export interface DetailedNotice {
  readonly notice: Notice;
  readonly contributor: Contributor | null;
  readonly relayers: ReadonlyArray<Contributor>;
}

export interface AskedPage {
  readonly contributorId?: number | undefined;
  readonly limit: number;
  readonly offset: number;
}

export class V3Reads extends Context.Service<
  V3Reads,
  {
    readonly contributors: Effect.Effect<ReadonlyArray<Contributor>>;

    contributor(id: number): Effect.Effect<Contributor | null>;

    notices(asked: AskedPage): Effect.Effect<NoticesPage>;

    detailedNotice(id: number): Effect.Effect<DetailedNotice | null>;

    // POST /contributions returns the notice it has just created, and that
    // notice is born a draft: the served read would not see it.
    noticeWhateverItsVisibility(id: number): Effect.Effect<Notice | null>;

    // Restricted to the notices of these contributors, or those they have
    // relayed; null for no restriction.
    targetingContexts(
      contributors: ReadonlyArray<number> | null,
    ): Effect.Effect<ReadonlyArray<TargetingContext>>;

    readonly restrictedContexts: Effect.Effect<
      ReadonlyArray<RestrictedContext>
    >;
  }
>()('api/application/V3Reads') {}
