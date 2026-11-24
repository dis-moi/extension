import { Context, type Effect, Schema } from 'effect';

export class WriteFailed extends Schema.TaggedError<WriteFailed>()(
  'WriteFailed',
  { path: Schema.String, cause: Schema.String },
) {}

export class Files extends Context.Service<
  Files,
  {
    read(path: string): Effect.Effect<Uint8Array | null>;

    write(path: string, content: Uint8Array): Effect.Effect<void, WriteFailed>;

    remove(path: string): Effect.Effect<void, WriteFailed>;
  }
>()('api/application/Files') {}
