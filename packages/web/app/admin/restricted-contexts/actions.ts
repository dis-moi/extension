'use server';

import { revalidatePath } from 'next/cache';
import { Effect } from 'effect';
import { Catalogue } from '@dismoi/api/application/Catalogue';
import { run } from '../../../lib/effect';
import { field, integerOrNull, type SaveResult } from '../form';
import { requireRole } from '../session';

export type { SaveResult };

// The list is served to every extension on each refresh: a write here
// changes what nobody sees any more, so the public read is invalidated too.
const refreshed = (): void => {
  revalidatePath('/admin/restricted-contexts');
  revalidatePath('/api/v3/restricted-contexts');
};

export const saveRestrictedContext = async (
  _previous: SaveResult | null,
  form: FormData,
): Promise<SaveResult> => {
  await requireRole('ROLE_ADMIN');

  const reasons = await run(
    Effect.gen(function* () {
      const catalogue = yield* Catalogue;
      return yield* catalogue.saveRestrictedContext(
        integerOrNull(form, 'id'),
        field(form, 'urlRegex'),
      );
    }).pipe(
      Effect.as<ReadonlyArray<string> | null>(null),
      Effect.catchTag('InvalidFields', (failure) =>
        Effect.succeed(failure.reasons),
      ),
      Effect.catchTag('EntryMissing', () =>
        Effect.succeed(['Ce contexte n’existe plus.']),
      ),
    ),
  );

  if (reasons !== null) return { reasons };

  refreshed();
  return { saved: true };
};

export const deleteRestrictedContext = async (
  _previous: SaveResult | null,
  form: FormData,
): Promise<SaveResult> => {
  await requireRole('ROLE_ADMIN');

  const id = integerOrNull(form, 'id');
  if (id === null) return { reasons: ['Contexte inconnu.'] };

  const reasons = await run(
    Effect.gen(function* () {
      const catalogue = yield* Catalogue;
      return yield* catalogue.deleteRestrictedContext(id);
    }).pipe(
      Effect.as<ReadonlyArray<string> | null>(null),
      Effect.catchTag('EntryMissing', () =>
        Effect.succeed(['Ce contexte n’existe plus.']),
      ),
    ),
  );

  if (reasons !== null) return { reasons };

  refreshed();
  return { saved: true };
};
