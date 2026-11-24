import { type Effect, type Layer, ManagedRuntime } from 'effect';
import { ApiLive } from '@dismoi/api/Live';

// The instance is unique per process and parked on the global object:
// without that, hot reloading would build one per change, each with its own
// pool of MySQL connections. But keeping it as is in development captures
// the services as they were when it was built, so that a method added to a
// port stays unreachable until a restart. It is therefore replaced on every
// re-evaluation of this module.

export type ApiServices = Layer.Success<typeof ApiLive>;

type Execution = ManagedRuntime.ManagedRuntime<
  ApiServices,
  Layer.Error<typeof ApiLive>
>;

const KEY = Symbol.for('dismoi/api/runtime');

type Holder = typeof globalThis & { [KEY]?: Execution };

const holder = globalThis as Holder;

const inDevelopment = process.env.NODE_ENV !== 'production';

const previous = holder[KEY];

// Closing it at once breaks the requests in flight, which fail with
// "ManagedRuntime disposed" up to a connection cut on the client side.
const GRACE_MS = 30_000;

if (previous !== undefined && inDevelopment) {
  const timer = setTimeout(() => {
    void previous.dispose();
  }, GRACE_MS);

  timer.unref?.();
}

export const runtime: Execution =
  previous !== undefined && !inDevelopment
    ? previous
    : (holder[KEY] = ManagedRuntime.make(ApiLive));

// No declared error: a database failure is a defect, which Next turns into
// an error page rather than a half-filled one.
export const run = <A>(
  operation: Effect.Effect<A, never, ApiServices>,
): Promise<A> => runtime.runPromise(operation);
