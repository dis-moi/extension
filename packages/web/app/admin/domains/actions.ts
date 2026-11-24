'use server';

import { revalidatePath } from 'next/cache';
import { Effect } from 'effect';
import { Catalogue } from '@dismoi/api/application/Catalogue';
import { run } from '../../../lib/effect';
import {
  domains,
  field,
  fieldOrNull,
  integerOrNull,
  type SaveResult,
} from '../form';
import { requireRole } from '../session';

export type { SaveResult };

// A targeting context that names the domain, or a set that gathers it, keeps
// it alive: the former administration let the foreign key answer, with a 500.
const held = (contexts: number, sets: number): string => {
  const parts = [
    contexts > 0 ? `${contexts} ciblage${contexts > 1 ? 's' : ''}` : null,
    sets > 0 ? `${sets} jeu${sets > 1 ? 'x' : ''}` : null,
  ].filter((part) => part !== null);

  return `Encore rattaché à ${parts.join(' et ')} : détache-le d’abord.`;
};

const refreshed = (): void => {
  revalidatePath('/admin/domains');
  revalidatePath('/admin/notices');
};

export const saveDomainsSet = async (
  _previous: SaveResult | null,
  form: FormData,
): Promise<SaveResult> => {
  await requireRole('ROLE_ADMIN');

  const reasons = await run(
    Effect.gen(function* () {
      const catalogue = yield* Catalogue;
      return yield* catalogue.saveDomainsSet(integerOrNull(form, 'id'), {
        name: field(form, 'name'),
        domains: domains(form, 'domains'),
      });
    }).pipe(
      Effect.as<ReadonlyArray<string> | null>(null),
      Effect.catchTag('InvalidFields', (failure) =>
        Effect.succeed(failure.reasons),
      ),
      Effect.catchTag('NameTaken', (failure) =>
        Effect.succeed([`Le jeu « ${failure.name} » existe déjà.`]),
      ),
      Effect.catchTag('EntryMissing', () =>
        Effect.succeed(['Ce jeu n’existe plus.']),
      ),
    ),
  );

  if (reasons !== null) return { reasons };

  refreshed();
  return { saved: true };
};

export const deleteDomainsSet = async (
  _previous: SaveResult | null,
  form: FormData,
): Promise<SaveResult> => {
  await requireRole('ROLE_ADMIN');

  const id = integerOrNull(form, 'id');
  if (id === null) return { reasons: ['Jeu inconnu.'] };

  const reasons = await run(
    Effect.gen(function* () {
      const catalogue = yield* Catalogue;
      return yield* catalogue.deleteDomainsSet(id);
    }).pipe(
      Effect.as<ReadonlyArray<string> | null>(null),
      Effect.catchTag('StillUsed', (failure) =>
        Effect.succeed([held(failure.contexts, failure.sets)]),
      ),
      Effect.catchTag('EntryMissing', () =>
        Effect.succeed(['Ce jeu n’existe plus.']),
      ),
    ),
  );

  if (reasons !== null) return { reasons };

  refreshed();
  return { saved: true };
};

export const saveDomain = async (
  _previous: SaveResult | null,
  form: FormData,
): Promise<SaveResult> => {
  await requireRole('ROLE_ADMIN');

  const reasons = await run(
    Effect.gen(function* () {
      const catalogue = yield* Catalogue;
      return yield* catalogue.saveDomain(integerOrNull(form, 'id'), {
        name: field(form, 'name'),
        path: fieldOrNull(form, 'path'),
        aliases: domains(form, 'aliases'),
      });
    }).pipe(
      Effect.as<ReadonlyArray<string> | null>(null),
      Effect.catchTag('InvalidFields', (failure) =>
        Effect.succeed(failure.reasons),
      ),
      Effect.catchTag('EntryMissing', () =>
        Effect.succeed(['Ce domaine n’existe plus.']),
      ),
    ),
  );

  if (reasons !== null) return { reasons };

  refreshed();
  return { saved: true };
};

export const deleteDomain = async (
  _previous: SaveResult | null,
  form: FormData,
): Promise<SaveResult> => {
  await requireRole('ROLE_ADMIN');

  const id = integerOrNull(form, 'id');
  if (id === null) return { reasons: ['Domaine inconnu.'] };

  const reasons = await run(
    Effect.gen(function* () {
      const catalogue = yield* Catalogue;
      return yield* catalogue.deleteDomain(id);
    }).pipe(
      Effect.as<ReadonlyArray<string> | null>(null),
      Effect.catchTag('StillUsed', (failure) =>
        Effect.succeed([held(failure.contexts, failure.sets)]),
      ),
      Effect.catchTag('EntryMissing', () =>
        Effect.succeed(['Ce domaine n’existe plus.']),
      ),
    ),
  );

  if (reasons !== null) return { reasons };

  refreshed();
  return { saved: true };
};
