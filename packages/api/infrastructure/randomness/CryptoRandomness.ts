import { Effect, Layer } from 'effect';
import { Randomness } from '../../application/Randomness';

export const CryptoRandomnessLive = Layer.succeed(
  Randomness,
  Randomness.of({
    bytes: (count) =>
      Effect.sync(() => crypto.getRandomValues(new Uint8Array(count))),
  }),
);
