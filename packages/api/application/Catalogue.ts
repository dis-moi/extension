import { Context, type Effect, Schema } from 'effect';
import { InvalidFields } from './InvalidFields';

// The targeting catalogue the administration maintains: the domains, the
// sets that group them, and the contexts where no notice may appear. They
// are kept apart from Moderation, which answers for the editorial objects —
// a notice, a contributor — and they share neither a table nor a caller
// with it.

export class EntryMissing extends Schema.TaggedError<EntryMissing>()(
  'EntryMissing',
  { id: Schema.Number },
) {}

// A delete the foreign keys would refuse. Saying which rows hold it back
// turns a 500 into something a person can act on.
export class StillUsed extends Schema.TaggedError<StillUsed>()('StillUsed', {
  id: Schema.Number,
  contexts: Schema.Number,
  sets: Schema.Number,
}) {}

export class NameTaken extends Schema.TaggedError<NameTaken>()('NameTaken', {
  name: Schema.String,
}) {}

export interface SubmittedDomain {
  readonly name: string;
  readonly path: string | null;
  readonly aliases: ReadonlyArray<string>;
}

export interface SubmittedDomainsSet {
  readonly name: string;
  // Names rather than identifiers: the field is typed and pasted, and an
  // unknown name creates the domain as the notice form does.
  readonly domains: ReadonlyArray<string>;
}

export interface DomainEntry {
  readonly id: number;
  readonly name: string;
  readonly path: string | null;
  readonly aliases: ReadonlyArray<string>;
  readonly contexts: number;
  readonly sets: ReadonlyArray<string>;
}

export interface DomainsSetEntry {
  readonly id: number;
  readonly name: string;
  readonly domains: ReadonlyArray<string>;
  readonly contexts: number;
}

export interface RestrictedContextEntry {
  readonly id: number;
  readonly urlRegex: string;
}

export class Catalogue extends Context.Service<
  Catalogue,
  {
    // The table holds 2,411 rows: the list is searched, never served whole.
    domains(
      search: string | null,
      limit: number,
    ): Effect.Effect<ReadonlyArray<DomainEntry>>;

    domain(id: number): Effect.Effect<DomainEntry | null>;

    // What the search is a window onto: without it the list looks complete.
    readonly domainCount: Effect.Effect<number>;

    saveDomain(
      id: number | null,
      submitted: SubmittedDomain,
    ): Effect.Effect<number, InvalidFields | EntryMissing>;

    deleteDomain(id: number): Effect.Effect<void, EntryMissing | StillUsed>;

    readonly domainsSets: Effect.Effect<ReadonlyArray<DomainsSetEntry>>;

    saveDomainsSet(
      id: number | null,
      submitted: SubmittedDomainsSet,
    ): Effect.Effect<number, InvalidFields | EntryMissing | NameTaken>;

    deleteDomainsSet(id: number): Effect.Effect<void, EntryMissing | StillUsed>;

    readonly restrictedContexts: Effect.Effect<
      ReadonlyArray<RestrictedContextEntry>
    >;

    saveRestrictedContext(
      id: number | null,
      urlRegex: string,
    ): Effect.Effect<number, InvalidFields | EntryMissing>;

    deleteRestrictedContext(id: number): Effect.Effect<void, EntryMissing>;
  }
>()('api/application/Catalogue') {}
