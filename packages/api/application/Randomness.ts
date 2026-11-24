import { Context, type Effect } from 'effect';

export class Randomness extends Context.Service<
  Randomness,
  {
    bytes(count: number): Effect.Effect<Uint8Array>;
  }
>()('api/application/Randomness') {}
