import { defineConfig } from 'vitest/config';

// The rest of the repository runs under Mocha and ts-node in CommonJS,
// which this package cannot: Effect 4 only publishes ESM, which ts-node in
// module: commonjs cannot load.
export default defineConfig({
  test: {
    include: ['**/*.spec.ts'],
    // The differential tests query MySQL: the one-second default would fail
    // them on the latency of the first call alone.
    testTimeout: 30_000,
    hookTimeout: 30_000,
    // The integration specs seed and empty the same tables of dismoi_test.
    // Run in parallel they tread on each other — a failure that shows up one
    // run in three and says nothing about the code.
    fileParallelism: false,
  },
});
